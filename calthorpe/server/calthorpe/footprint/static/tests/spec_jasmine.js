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

describe ('Reusable Donut Chart Test Suite: Getters and Setters', function() {
    var barChart, dataset, fixture;

    beforeEach(function () {
        donutChart = d3.edge.donutChart();
        fixture = d3.select('body')
            .append('div')
            .classed('test-container', true);
    });

    afterEach(function () {
        fixture.remove();
    });
    it( 'it should provide getters and setters for chart width', function() {

        var newWidth = 1000;
        var defaultWidth = donutChart.width();

        donutChart.width(newWidth);

        var resetWidth = donutChart.width();

        expect(defaultWidth).not.toBe(resetWidth);
        expect(newWidth).toBe(resetWidth);

    });
//    test( "it should provide getters and setters for inner and outer radius", function() {
//
//        var newInnerRadiusPct = 0.1;
//        var newOuterRadiusPct = 0.5;
//        var defaultInnerRadiusPct = donutChart.innerRadius();
//        var defaultOuterRadiusPct = donutChart.outerRadius();
//
//        donutChart.innerRadius(newInnerRadiusPct);
//        donutChart.outerRadius(newOuterRadiusPct);
//
//        var resetInnerRadius = donutChart.innerRadius();
//        var resetOuterRadius = donutChart.outerRadius();
//
//        assert.notEqual(defaultInnerRadiusPct, resetInnerRadius, "Inner radius not equal to default after it is reset");
//        assert.notEqual(defaultOuterRadiusPct, resetOuterRadius, "Inner radius not equal to default after it is reset");
//
//        assert.equal(newInnerRadiusPct, resetInnerRadius, "Inner radius equal to new default after it is reset");
//        assert.equal(newOuterRadiusPct, resetOuterRadius, "Inner radius equal to new default after it is reset");
//
//    });
//
});
describe ('Reusable DonutChart Test Suite', function() {
    var barChart, dataset, fixture;

    beforeEach(function () {
        dataset = [
            { "category" :"Mixed-Use", "percentage" :.21},
            { "category" :"Residential", "percentage":.79}
        ];
        donutChart = d3.edge.donutChart();
        fixture = d3.select('body')
            .append('div')
            .classed('test-container', true);
    });

    afterEach(function () {
        fixture.remove();
    });
    it('should render a chart with minimal requirements', function() {
        fixture.datum(dataset).call(donutChart);
        expect(fixture.select('.chart')).toBeDefined(1);
    });
    it('should render a chart for each data series', function() {
        var dataset = [[
            { "category" :"Mixed-Use", "percentage" :.21},
            { "category" :"Residential", "percentage":.79}
        ],[
            { "category" : "Multifamily", "percentage" :.50},
            { "category" : "Townhome", "percentage" :.50}
        ]];
        fixture.selectAll('div.container')
            .data(dataset)
            .enter().append('div')
            .classed('container', true)
            .datum(function(d, i) {return d;})
            .call(donutChart);

        var charts = fixture.selectAll('.chart');

        expect(charts[0].length).toBe(dataset.length);
        expect(charts[0][0].__data__).toBe(dataset[0]);
        expect(charts[0][1].__data__).toBe(dataset[1]);

    })
});
////test( "hello test", function() {
////   ok( 1 == "1", "Passed!" );
////});
//(function() {
//
//    var donutChart, dataset, fixture;
//
//    module( "Test basic chart set up", {
//
//        setup: function(){
//
//            dataset = [
//                { "category" :"Mixed-Use", "percentage" :.21},
//                { "category" :"Residential", "percentage":.79}
//            ];
//            donutChart = d3.edge.donutChart();
//            fixture = d3.select('body')
//                .append('div')
//                .classed('test-container', true);
//
//        }, teardown: function() {
//            fixture.remove();
//        }
//    });
//
//    test( "it should render a chart with minimal requirements", function() {
//
//        fixture.datum(dataset).call(donutChart);
//        equal($('body .test-container').length, 1 );
//    });
//
//    test( "it should update a chart with new data", function() {
//        expect(0);
//    });
//
//    test( "it should accept data in the form of an array", function() {
//
//        expect(0);
//
//    });
//
//    test( "it should render two charts with distinct configuration", function() {
//
//        expect(0);
//    });
//    test( "should render a chart for each data series", function() {
//
//        var dataset = [[
//            { "category" :"Mixed-Use", "percentage" :.21},
//            { "category" :"Residential", "percentage":.79}
//        ],[
//            { "category" : "Multifamily", "percentage" :.50},
//            { "category" : "Townhome", "percentage" :.50}
//        ]];
//        fixture.selectAll('div.container')
//            .data(dataset)
//            .enter().append('div')
//            .classed('container', true)
//            .datum(function(d, i) {return d;})
//            .call(donutChart);
//
//        var charts = fixture.selectAll('.chart');
//        assert.equal(charts[0].length, dataset.length);
//        assert.equal(charts[0][0].__data__, dataset[0]);
//        assert.equal(charts[0][1].__data__, dataset[1]);
//
//    });
//    test( "should create an svg element bound with the data" , function() {
//
//        fixture.datum(dataset).call(donutChart);
//        var charts = $('.chart');
//        assert.equal(charts.length, 1);
//
//    });
//
//})();
//(function() {
//
//    var donutChart, dataset, fixture;
//
//    module( "Test getter and setter functionality", {
//
//        setup: function(){
//
//            dataset = [
//               { "category" :"Mixed-Use", "percentage" :.21},
//               { "category" :"Residential", "percentage":.79}
//            ];
//            donutChart = d3.edge.donutChart();
//            fixture = d3.select('body')
//                .append('div')
//                .classed('test-container', true);
//
//        }, teardown: function() {
//            fixture.remove();
//        }
//    });
//
//    test( "it should provide getters and setters for chart width", function() {
//
//        var newWidth = 1000;
//        var defaultWidth = donutChart.width();
//
//        donutChart.width(newWidth);
//
//        var resetWidth = donutChart.width();
//
//        assert.notEqual(defaultWidth, resetWidth, "Width is not equal to default after it is reset");
//        assert.equal(newWidth, resetWidth, "Width is equal to the newly defined width after it is reset");
//
//    });
//    test( "it should provide getters and setters for inner and outer radius", function() {
//
//        var newInnerRadiusPct = 0.1;
//        var newOuterRadiusPct = 0.5;
//        var defaultInnerRadiusPct = donutChart.innerRadius();
//        var defaultOuterRadiusPct = donutChart.outerRadius();
//
//        donutChart.innerRadius(newInnerRadiusPct);
//        donutChart.outerRadius(newOuterRadiusPct);
//
//        var resetInnerRadius = donutChart.innerRadius();
//        var resetOuterRadius = donutChart.outerRadius();
//
//        assert.notEqual(defaultInnerRadiusPct, resetInnerRadius, "Inner radius not equal to default after it is reset");
//        assert.notEqual(defaultOuterRadiusPct, resetOuterRadius, "Inner radius not equal to default after it is reset");
//
//        assert.equal(newInnerRadiusPct, resetInnerRadius, "Inner radius equal to new default after it is reset");
//        assert.equal(newOuterRadiusPct, resetOuterRadius, "Inner radius equal to new default after it is reset");
//
//    });
//
//})();

