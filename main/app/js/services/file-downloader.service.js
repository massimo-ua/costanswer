(function(){
    'use strict';
    angular.module('costAnswer.services')
    .factory('FileDownloaderService', FileDownloaderService);
    function FileDownloaderService($log, $http, EXPORT_PREFIX) {
        var factory = {};
        factory.getProjectReport = function(uuid, type) {
            var config = {
                method: 'GET',
                responseType : 'arraybuffer',
                headers : {
                    'Content-type' : 'application/' + type,
                },
                url: EXPORT_PREFIX + '/project/' + uuid + '/' + type
            };
            $http(config)
                .then(function(data, status, headers, config){
                    $log.debug(response);
                    // TODO when WS success
                    var file = new Blob([ data ], {
                        type : 'application/' + type
                    });
                    //trick to download store a file having its URL
                    var fileURL = URL.createObjectURL(file);
                    var a         = document.createElement('a');
                    a.href        = fileURL; 
                    a.target      = '_blank';
                    a.download    = 'report-' + uuid + '.' + type;
                    document.body.appendChild(a);
                    a.click();
                });
        };
        return factory;
    }
    FileDownloaderService.$inject = ['$log', '$http', 'EXPORT_PREFIX'];
}());