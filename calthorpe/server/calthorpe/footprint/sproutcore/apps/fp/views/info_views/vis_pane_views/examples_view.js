/* 
* UrbanFootprint-California, Scenario Planning Model
* 
* Copyright (C) 2012-2013 Calthorpe Associates
* 
* This program is free software: you can redistribute it and/or modify it under the terms of the
* GNU General Public License as published by the Free Software Foundation, version 3 of the License.
* 
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
* without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
* See the GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License along with this program.
* If not, see <http://www.gnu.org/licenses/>.
* 
* Contact: Calthorpe Associates (urbanfootprint@calthorpe.com)
* Firm contact: 2095 Rose Street Suite 201, Berkeley CA 94709.
* Phone: (510) 548-6800.      Web: www.calthorpe.com
* 
 */

/**
 * Created with PyCharm.
 * User: calthorpe
 * Date: 9/16/13
 * Time: 2:20 PM
 * To change this template use File | Settings | File Templates.
 */
Footprint.ExamplesView = SC.View.design({
    layout: { left: 0.01, right: 0.7, top: 0.30, bottom: 0.05 },
    childViews: 'headerView imagesView noExamplesListView '.w(),

    headerView: SC.LabelView.design({
        layout: { width: 150, height: 50 },
        classNames: ['sectionTitle'],
        tagName: "h1",
        value: "Examples"
    }),
    imagesView: SC.View.design({
        layout: { top: 0.05, bottom: 0.4 },
        childViews: 'bigImageView thumbnailsView'.w(),
        bigImageView: SC.View.design({
            layout : { right: 0.20 },
            childViews: 'bigImageImageView'.w(),
            displayProperties: ['content'],

            content:null,
            contentBinding: SC.Binding.oneWay('Footprint.builtFormMediaController*selection.firstObject.url'),

            bigImageImageView: SC.ImageView.extend({
                layout: { bottom: 0.10 },
                classNames: ['bigImage'],

                displayProperties: ['content'],
                content:null,
                contentBinding: SC.Binding.oneWay('.parentView*content'),

                value: function() {
                    return Footprint.STATIC.fmt(this.get('content'))
                }.property('content').cacheable()

            })
        }),
        thumbnailsView: SC.ScrollView.design({
            layout: { left: 0.80, bottom: 0.10},

            isVisibleBinding: SC.Binding.oneWay('Footprint.builtFormActiveController*content.media').bool(),
            contentView: SC.SourceListView.extend({
                rowHeight: 45,

                contentBinding: SC.Binding.oneWay('Footprint.builtFormActiveController*content.media'),

                selectionBinding: SC.Binding.from('Footprint.builtFormMediaController.selection'),
                exampleView: SC.View.extend(SC.Control, {
                    layout: { height: 40 },
                    childViews: 'imageView'.w(),
                    contentValueKey: 'title',
                    imageView: SC.ImageView.extend({
                        layout: { left: 5, height: 40, width: 40 },
                        displayProperties: ['content'],

                        content:null,
                        contentBinding: SC.Binding.oneWay('.parentView*content.url'),

                        value: function() {
                            return Footprint.STATIC.fmt(this.get('content'))
                        }.property('content').cacheable()

                    })
                })
            })
        })
    }),
    noExamplesListView: SC.LabelView.design({
        layout: { top: 0.6, bottom: 0, width: 250, height: 20},
        value: "No examples to display"

//        isVisibleBinding: SC.Binding.oneWay('Footprint.builtFormActiveController*content.examples').bool().not()

    }),
    examplesListView: SC.ScrollView.design({
        layout: { top: 0.6, bottom: 0},

        isVisibleBinding: SC.Binding.oneWay('Footprint.builtFormActiveController*content.examples').bool(),
        contentView: SC.SourceListView.extend({
            classNames: 'examplesList'.w(),
            rowHeight: 30,

            contentBinding: SC.Binding.oneWay('Footprint.builtFormActiveController*content.examples'),

            exampleView: SC.View.extend(SC.Control, {
                layout: { height: 30 },
                childViews: 'labelView'.w(),

                contentValueKey: 'title',
                labelView: SC.LabelView.extend({
                    layout: { left: 10, width: 200, height: 30},

                    content: null,
                    contentBinding: SC.Binding.oneWay('.parentView*content'),
                    valueBinding: SC.Binding.oneWay('.parentView*content.name')

                })
            })
        })
    })
});

