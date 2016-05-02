(function() {
    'use strict';

    angular
        .module('backoffice')
        .directive('pacDaterange', pacDaterange);

    function pacDaterange() {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {

            var drp = angular.element(element.find('input'));

            // initialize daterangepicker
            drp.daterangepicker({
              opens: 'left',
              format: 'DD/MM/YYYY',
            });

            // binder for clearing filter values
            element.find('.clearDaterange').on('click', function() {
              clearValues();
              hideClearer();
            });

            // binder for selecting daterange
            drp.on('apply.daterangepicker', function(ev, picker) {
              showClearer();
              setValues(picker.startDate, picker.endDate);
            });

            
            function showClearer() {
              element.find('.clearDaterange').removeClass('hide');
            }

            function hideClearer() {
              element.find('.clearDaterange').addClass('hide');
            }

            /**
            *   Applies selected values to input field in specific format
            *   @param {Date} start - Selected start date
            *   @param {Date} end - Selected end date
            */
            function setValues(start, end) {
              element.find('input')
                .val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'))
                .trigger('change'); // must be present in order for daterangepicker to trigger change event
            }

            // removes all values from input element
            function clearValues() {
              element.find('input')
                .val('')
                .trigger('change'); // must be present in order for daterangepicker to trigger change event
            }
        }
    }

})();
