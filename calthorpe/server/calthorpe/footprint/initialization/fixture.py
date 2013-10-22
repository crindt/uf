# UrbanFootprint-California (v1.0), Land Use Scenario Development and Modeling System.
#
# Copyright (C) 2013 Calthorpe Associates
#
# This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.
#
# This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Contact: Joe DiStefano (joed@calthorpe.com), Calthorpe Associates. Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709. Phone: (510) 548-6800. Web: www.calthorpe.com

# Hand-crafted basic fixture classes
# This stuff might be replaced by Django's json style fixtures in the future.
from footprint.initialization.fixtures.client.default.default_mixin import DefaultMixin
from footprint.initialization.utils import resolve_parent_fixture, resolve_fixture
from footprint.lib.functions import all_existing_keys_match, all_existing_classes_subclass, unique
from footprint.utils.utils import expect
import settings


class Fixture(object):
    def __init__(self, schema, *args, **kwargs):
        """
            Creates a fixture instance
        :param schema: __-separated string that matches a ConfigEntity schema. This is used to designate what scope
         the fixture represents. If None, the Fixture is global/default. If one segment, the fixture represents
         a region (as of now equivalent to a settings.CLIENT). If two segments, it's scoped to a project within a
         region. If three segments (rare), it's scoped to a Scenario within a project.
        :param args: optional args used by the fixture
        :param kwargs: optional args used by a fixture. The most common is config_entity, which provides a fixture
        with a reference to its scoped config_entity in cases where the latter already exists and the fixture is
        provided configuration to that config_entity (e.g. layers)
        :return:
        """
        super(Fixture, self).__init__()
        # The default subclass of the Fixture. This is delegated to when a client-specific fixture calls the super
        # version of its methods. That way all default fixtures can be combined with custom client fixtures
        self.schema = schema
        self.init_args(**kwargs)
        self.args = args
        self.kwargs = kwargs
        self.expect(*self.expect_kwargs())

    def expect_kwargs(self):
        """
            Returns the required kwargs for a subclass. Default is none
        :return: An array of attribute strings.
        """
        return []

    # Class scope variables indicating the schema-relative module location of the fixture
    module = None,
    module_fragment = None

    @property
    def base_class(self):
        """
            Returns the base class is this class hierarchy that is used for matching the parent_fixture and default_fixture
        :return:
        """
        return None

    _parent_fixture = None
    # A reference to the parent fixture instance of this instance. The parent is the fixture represented by the
    # next level up of the schema string. So if self.schema is region__project, the parent is that with schema region.
    # If already at the region scope, the parent fixture is the default (global) fixture.
    @property
    def parent_fixture(self):
        self._parent_fixture = self._parent_fixture or \
                               resolve_parent_fixture(self.module, self.module_fragment, self.base_class, self.schema, *self.args, **self.kwargs)
        return self._parent_fixture

    def init_args(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def expect(self, *args):
        """
            Pass arg strings that are required by self to validate.
        :param args:
        :return:
        """
        # This is the utils version
        expect(self, *args)

    def matching_scope(self, fixtures, **kwargs):
        """
            Filters fixtures by given matching_dict. All keys specified in the matching_dict that are present
            in the fixture must match using isSubclass, where the matching_dict value must be a subclass of the
            fixtrue's value
        :param fixtures: A list of dictionaries or objects.
        :param kwargs key/values whose values are classes.
        :return:
        """
        return filter(lambda fixtures: all_existing_classes_subclass(fixtures, **kwargs), fixtures)

    def matching_keys(self, fixtures, **kwargs):
        """
            Filters fixtures by given matching_dict_obj. All keys specified in the matching_dict that are present
            in the fixture must match
        :param fixtures: A list of dictionaries or objects.
        :param kwargs: key/values that are used to filter the fixtures
        :return: The fixtures that pass the filter
        """
        return filter(lambda fixtures: all_existing_keys_match(fixtures, **kwargs), fixtures)


class InitFixture(Fixture):

    @property
    def base_class(self):
        return InitFixture

    def import_database(self):
        """
            Optionally configure an import database for the client. The result dict is sent to import_data.ImportData
            dict(
                host=HOST_DB_IP
                database=DB_NAME
                user=DB_USER
                password=DB_PW)
        :return:
        """
        pass

    def model_class_modules(self):
        """
            Returns an array of tuples with each tuple in the form (module, module_fragment) where module is a string
            that indicates a module under initialization.client.[client], such as 'built_form' or 'publishing'.
            module_fragment is the name of the sub module without the client name, such as 'tilestache' to indicate
            [client]_tilestache under the publishing package
        :return:
        """
        return []


class FootprintFixture(Fixture):
    def __init__(self, schema, *args, **kwargs):
        super(FootprintFixture, self).__init__(schema, *args, **kwargs)
        # Expect these kwargs to be supplied
        self.expect('config_entity', 'built_form', 'policy')

class ConfigEntitiesFixture(Fixture):
    module = 'config_entity'
    module_fragment = 'config_entities'

    @property
    def base_class(self):
        return ConfigEntitiesFixture

    def regions(self):
        return []

    def projects(self, region=None):
        return []

    def scenarios(self, project=None, class_scope=None):
        """
            Returns a definition that should be called with all the projects to create one or more scenarios per
            project.
            :param project Optional Project to specify to limit the scenarios returned to those whose project_key
            matches the project.key and to those who have no project_key
            :param class_scope Optional Sceanrio subclass by which to filter the fixtures according to the
                fixture's class_scope attribute
        :return: A list of scenario fixtures
        """
        return {}


class BuiltFormFixture(Fixture):
    module = 'built_form'
    module_fragment = 'built_form'

    @property
    def base_class(self):
        return BuiltFormFixture

    def built_forms(self):
        """
            Returns fully instantiated client-specific BuiltForm subclass instances plus the default ones.
        :return: A dictionary keyed by the BuiltForm subclass name or similar, valued by the instances
        """

    def built_form_sets(self):
        """
            Returns client specific BuiltFormSets as a dictionary of fixtures
        :return:
        """
        return []


    def built_form_styles(self):
        """
            Returns a symbology dict keyed by the name of a client-specific built_form to its color
            :return:
        """


class PolicyFixture(Fixture):
    module = 'policy'
    module_fragment = 'policy'

    @property
    def base_class(self):
        return PolicyFixture


class ConfigEntityFixture(Fixture):
    """
        Base Class to configure DbEntities at a certain ConfigEntity scope (e.g. Project)
    """

    # The config_entity is required for default_db_entity_setups, but not for feature_class_lookup
    config_entity = None

    def default_remote_db_entity_setups(self):
        # A list of simple dictionaries containing a key, url and optional hosts array, that describe how to
        # configure a remote db_entity. These are separated
        return []

    def default_db_entity_setups(self):
        """
            Creates client-specific db_entity_and_class configurations
        :return:
        """
        return self.parent_fixture.default_db_entity_setups()

    def feature_class_lookup(self):
        """
            A ConfigEntity-independent lookup of DbEntity keys to Feature classes. The same information is
            provided by default_db_entity_setups but the latter is ConfigEntity instance-specific
        :return:
        """
        return dict()


class GlobalConfigFixture(ConfigEntityFixture):
    module = 'config_entity'
    module_fragment = 'global_config'

    @property
    def base_class(self):
        return GlobalConfigFixture


class RegionFixture(ConfigEntityFixture):
    module = 'config_entity'
    module_fragment = 'region'

    @property
    def base_class(self):
        return RegionFixture

class ProjectFixture(ConfigEntityFixture):
    module = 'config_entity'
    module_fragment = 'project'

    @property
    def base_class(self):
        return ProjectFixture

class ScenarioFixture(ConfigEntityFixture):
    module = 'config_entity'
    module_fragment = 'scenario'

    @property
    def base_class(self):
        return ScenarioFixture

class PresentationConfigurationFixture(Fixture):
    # Some calls will require putting a config_entity in scope via init, but not all
    config_entity = None

    def update_or_create_media(self):
        """
            Initializes the Presentation specific Media instances. Override this for client-specific media
        """
        self.parent_fixture.update_or_create_media()

class LayerConfigurationFixture(PresentationConfigurationFixture):
    module = 'publishing'
    module_fragment = 'layer'

    @property
    def base_class(self):
        return LayerConfigurationFixture

    def layer_libraries(self, layers=None):
        """
            Creates a PresentationConfiguration instance used to configure a LayerLibrary for a certain ConfigEntity
            class scope
        :param layers override the layers
        :return:
        """
        pass

    def layers(self):
        """
            A list of LayerConfiguration instances that configure visible layers based on db_entities. This
            function should merge in the result of background_layers.
        :return: An array of LayerConfigurations with the background_layers merged in
        """
        return []

    def background_layers(self):
        """
            A subset of layers used as background layers. These are also LayerConfigurations
        :return: An Array of LayerConfigurations
        """
        return []

class LandUseSymbologyFixture(Fixture):
    module='publishing'
    module_fragment='land_use_symbology'

    @property
    def base_class(self):
        return LandUseSymbologyFixture

    def land_use_color_lookup(self):
        """
            Maps an attribute of a client-specific class to a color.
        :return:
        """
        return dict()

class ResultConfigurationFixture(PresentationConfigurationFixture):
    """
        Fixtures related to result presentations, such as ResultLibrary and Result instances
    """
    module='publishing'
    module_fragment='result'

    @property
    def base_class(self):
        return ResultConfigurationFixture

    def result_libraries(self):
        """
            Returns the ResultLibrary configurationsscoped for the class of self.config_entity
        :return:
        """
        return self.parent_fixture.result_libraries()

    def results(self):
        """
            Returns ResultConfiguration instances. These configure a Result that is created for each config_entity
            whose scope matches or inherits that the ResultConfiguration.class_scope
        :return:
        """
        return self.parent_fixture.results()

    @staticmethod
    def simple_aggregate(result_config):
        return [
            # self.aggregate(Sum('column1'), ...)
            ('aggregate', map(
                lambda attribute: dict(Sum=result_config.db_column_lookup[attribute]),
                result_config.attributes))
        ]

# This is more of a literal fixture.
class MediumFixture(Fixture):
    def __init__(self, *args, **kwargs):
        super(MediumFixture, self).__init__('global', *args, **kwargs)

    def expect_kwargs(self):
        return ['key', 'name']

def project_specific_project_fixtures():
    """
        Convenience method to find ProjectFixture instances for all projects of the client.
    :return:
    """
    return unique(map(
        lambda schema: resolve_fixture("config_entity", "project", ProjectFixture, schema),
        project_schemas_of_client()), lambda fixture: fixture.__class__)

def project_specific_scenario_fixtures():
    """
        Convenience method to find ScenarioFixture instances for all projects of the client.
    :return:
    """
    return unique(map(
        lambda schema: resolve_fixture("config_entity", "scenario", ScenarioFixture, schema),
        project_schemas_of_client()), lambda fixture: fixture.__class__)

def project_schemas_of_client():
    """
        Extract all the schemas under of the settings.CLIENT in [client]_config_entities.project()
    :return:
    """
    client_config_entities = resolve_fixture("config_entity", "config_entities", ConfigEntitiesFixture, settings.CLIENT)
    return map(lambda project_config: '%s__%s' % (client_config_entities.schema, project_config['key']), client_config_entities.projects())
