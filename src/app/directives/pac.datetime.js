(function(moment) {
    'use strict';

    angular
        .module('backoffice')
        .directive('pacDateTime', pacDateTime);

    function pacDateTime() {
        // Usage:
        // Put as an attribute in tag whose value is expected to be time in UTC format
        // pac-format parameter can have one of these values"
        //  1. 'D' - this will return Date in EU format (DD/MM/YYYY)
        //  2. 'T' - this will return Time (HH:mm:ss)
        //  3. 'DT' - this will return DateTime
        // When no pac-format is supplied, defaults to 'D'
        // Creates:
        // Localized date/time/datetime based on environment (OS) localization settings

        return {
            link: link,
            restrict: 'A',
            scope: {
                pacDateTime: '=',
                pacFormat: '='
            }
        };

        function link(scope, element, attrs) {

            scope.$watch('pacDateTime', function dateTimeWatch(newVal, oldVal) {

                if (!!newVal) {

                    if (isValidDateString(newVal)) {

                        var time = moment(newVal);

                        // set value based on the 'pacFormat' attribute
                        switch (scope.pacFormat) {

                            case 'DT':

                                setValue(element, time.format('DD/MM/YYYY HH:mm:ss'));

                                break;

                            case 'D':

                                setValue(element, time.format('DD/MM/YYYY'));

                                break;

                            case 'T':

                                setValue(element, time.format('HH:mm:ss'));

                                break;

                            default:

                                setValue(element, time.format('DD/MM/YYYY'));
                        }
                    }
                    else {

                        setValue(element, newVal);
                    }
                }
            });
        }

        function setValue(element, value) {

            element.text(value);
            element.val(value);
        }

        /**
        *   Checks if provided date string is valid date format
        *   @param {string} date - Expected date in string format
        *   @returns {bool} - True if parameter can be parsed as Date, otherwise false
        */
        function isValidDateString(date) {

            if (!isNaN(Date.parse(date))) {

                return true;
            }

            return false;
        }
    }

})(moment);
