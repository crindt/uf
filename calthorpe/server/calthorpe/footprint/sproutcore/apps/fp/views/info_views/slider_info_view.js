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


 /* 
*
*/

Footprint.SliderItemView = SC.View.extend({
    childViews: 'titleView valueView sliderView'.w(),
    classNames: ['slider-item'],
    valueSymbol: '%',
    title: 'Title',
    minimum: 0,
    maximum: 1,
    step: .01,
    value:null,

    titleView: SC.LabelView.design({
        classNames: ['slider-item-title'],
        layout: { left: 0, width:.4, height:.5 },
        localize: true,
        valueBinding: SC.Binding.oneWay('.parentView.title')
    }),
    valueView: SC.View.design({
        childViews: 'labelView symbolView'.w(),
        layout: { left:.4, height:24 },
        classNames: ['slider-item-value'],

        symbolView: SC.LabelView.design({
            classNames: ['slider-item-value-label'],
            layout: { left: 0, width:0.3 },
            valueBinding: SC.Binding.from('.parentView.parentView.valueSymbol')
        }),
        labelView: Footprint.EditableModelStringView.design({
            classNames: ['slider-item-value-label'],
            layout: { left:0.3, width: 0.4 },
            textAlign: SC.ALIGN_LEFT,
            valueBinding: SC.Binding.from('.parentView.parentView.value')
        })
    }),
    sliderView: SC.SliderView.design({
        classNames: ['slider-item-slider'],
        layout: { left:.2, right:.2, top:.35 },
        minimumBinding: SC.Binding.oneWay('.parentView.minimum'),
        maximumBinding: SC.Binding.oneWay('.parentView.maximum'),
        stepBinding: SC.Binding.oneWay('.parentView.step'),
        valueBinding: SC.Binding.from('.parentView.value')
    })
})