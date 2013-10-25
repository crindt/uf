# UrbanFootprint-California, Scenario Planning Model
# 
# Copyright (C) 2012-2013 Calthorpe Associates
# 
# This program is free software: you can redistribute it and/or modify it under the terms of the
# GNU General Public License as published by the Free Software Foundation, version 3 of the License.
# 
# This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
# without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
# See the GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License along with this program.
# If not, see <http://www.gnu.org/licenses/>.
# 
# Contact: Calthorpe Associates (urbanfootprint@calthorpe.com)
# Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709.
# Phone: (510) 548-6800.      Web: www.calthorpe.com
# 

#
from tastypie.constants import ALL_WITH_RELATIONS, ALL
from tastypie.fields import CharField

from footprint.models import Project, Region, GlobalConfig, Scenario, ConfigEntity
from footprint.models.config.scenario import BaseScenario, FutureScenario
from footprint.resources.medium_resources import MediumResource
from footprint.resources.model_dict_field import ModelDictField
from footprint.resources.mixins.mixins import PolicySetsResourceMixin, BuiltFormSetsResourceMixin, DbEntityResourceMixin, PresentationResourceMixin, CategoryResourceMixin
from footprint.resources.footprint_resource import FootprintResource
from tastypie import fields
from footprint.utils.utils import foreign_key_field_of_related_class, has_explicit_through_class

__author__ = 'calthorpe'


class CustomModelDictField(ModelDictField):
    def key_dehydrate_override(self):
        return {'db_entities': 'db_entity_interests'}

    def instance_dehydrate_override(self):
        return {'db_entity_interests':
                    lambda config_entity, db_entity: config_entity.dbentityinterest_set.filter(db_entity=db_entity)[0]
        }

    def key_hydrate_override(self):
        return {'db_entity_interests': 'db_entities'}

    def instance_hydrate_override(self):
        return {'db_entities': lambda config_entity, db_entity_interest: db_entity_interest.db_entity}


class ConfigEntityResource(FootprintResource, PolicySetsResourceMixin, BuiltFormSetsResourceMixin,
                           DbEntityResourceMixin, PresentationResourceMixin, CategoryResourceMixin):
    media = fields.ToManyField(MediumResource, 'media', full=True, null=True)

    selections = CustomModelDictField(attribute='selections', null=False, blank=False)
    # These should never be written, they are calculated automatically
    schema = CharField(attribute='schema', readonly=True)
    scope = CharField(attribute='scope', readonly=True)

    def hydrate(self, bundle):
        """
            Set the user who created the ConfigEntity
        :param bundle:
        :return:
        """
        if not bundle.obj.id:
            bundle.obj.creator = self.resolve_user(bundle.request.GET)
        return bundle

    def save_m2m(self, bundle):
        """
            Overrides the super method in order to handle saving many-to-many collection instances of an explicit through class. For some reason tastypie has no handling for this, but we want to deliver the through class instances to the user that have references to the related attribute (e.g. DbEntityInterest instances are delivered and each has a reference to DbEntity). We also want to allow the client to modify, add, and remove these instances. Thus we must intercept them here and save them properly. Tastypie assumes non-explict Through classes and just dumbly tries to add them to the related field with add(), which fails for explicitly through classes.
        :param bundle:
        :return:
        """

        # This is an exact copy of the super method up until the add() line
        for field_name, field_object in self.fields.items():
            if not getattr(field_object, 'is_m2m', False):
                continue

            if not field_object.attribute:
                continue

            if field_object.readonly:
                continue

            # Get the manager.
            related_mngr = None

            if isinstance(field_object.attribute, basestring):
                related_mngr = getattr(bundle.obj, field_object.attribute)
            elif callable(field_object.attribute):
                related_mngr = field_object.attribute(bundle)

            if not related_mngr:
                continue

                # This condition is an enhancement to thte super method. It allows an add method defined on the field to indicate how to add the many-to-many items
                # We don't use this since our items are handled more carefully below
                #if hasattr(related_mngr, 'clear'):
                # Clear it out, just to be safe.
            #    related_mngr.clear()

            related_objs = []

            # TODO handle remove and clear
            if hasattr(field_object, 'add'):
                # This condition is an enhancement to the super method. It allows an add method defined on the field to indicate how to add the many-to-many items
                objs = map(lambda bundle: bundle.obj, bundle.data[field_name])
                field_object.add(bundle, *objs)
            else:
                for related_bundle in bundle.data[field_name]:
                    # This if statement is a change from the super method. If we are handling explict through instances we need to give the incoming instance a reference to the bundle.obj. The through instances are never dehydrated with this reference since it simply refers back to the container (bundle.data)
                    if has_explicit_through_class(bundle.obj, field_object.instance_name):
                        setattr(
                            related_bundle.obj,
                            # Figure out the correct field
                            foreign_key_field_of_related_class(related_bundle.obj.__class__, bundle.obj.__class__).name,
                            bundle.obj)
                    related_bundle.obj.save()
                    related_objs.append(related_bundle.obj)
                    # This if statement is a change from the super method. If we are handling explict through instances the save above is adequate. We don't want to try to add the item to the manager.
                if hasattr(related_mngr, 'add'):
                    related_mngr.add(*related_objs)

    class Meta(FootprintResource.Meta):
        abstract = True
        always_return_data = True
        queryset = ConfigEntity.objects.all()
        resource_name = 'config_entity'
        filtering = {
            # Accept the parent_config_entity to limit the ConfigEntity instances to a certain id
            # (i.e. parent_config_entity__id=n)
            "parent_config_entity": ALL_WITH_RELATIONS,
            "id": ALL
        }


class GlobalConfigResource(ConfigEntityResource):
    class Meta(FootprintResource.Meta):
        always_return_data = True
        queryset = GlobalConfig.objects.all()
        resource_name = 'global_config'


class RegionResource(ConfigEntityResource):
    parent_config_entity = fields.ToOneField(ConfigEntityResource, 'parent_config_entity', full=False)

    class Meta(ConfigEntityResource.Meta):
        always_return_data = True
        queryset = Region.objects.all()
        resource_name = 'region'


class ProjectResource(ConfigEntityResource):
    parent_config_entity = fields.ToOneField(RegionResource, 'parent_config_entity', full=False)

    class Meta(ConfigEntityResource.Meta):
        always_return_data = True
        queryset = Project.objects.all()
        resource_name = 'project'


class ScenarioResource(ConfigEntityResource):
    parent_config_entity = fields.ToOneField(ProjectResource, 'parent_config_entity', full=False)

    class Meta(ConfigEntityResource.Meta):
        always_return_data = True
        queryset = Scenario.objects.all()
        resource_name = 'scenario'


class BaseScenarioResource(ConfigEntityResource):
    parent_config_entity = fields.ToOneField(ProjectResource, 'parent_config_entity', full=False)

    class Meta(ConfigEntityResource.Meta):
        always_return_data = True
        queryset = BaseScenario.objects.all()
        resource_name = 'base_scenario'


class FutureScenarioResource(ConfigEntityResource):
    parent_config_entity = fields.ToOneField(ProjectResource, 'parent_config_entity', full=False)

    class Meta(FootprintResource.Meta):
        always_return_data = True
        queryset = FutureScenario.objects.all()
        resource_name = 'future_scenario'
