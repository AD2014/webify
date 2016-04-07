(function() {
    'use strict'

    angular
      .module('LetLife.letlifeServices')
      .factory('Storage', Storage);


    Storage.$inject = ['$http', 'API'];

    function Storage($http, API) {
      return {
        get: get,
        getForWrite: getForWrite,
        getForPublicWrite: getForPublicWrite,
        put: put,
        upLoadFileS3: upLoadFileS3,
        putX: putX

      };

      function get(photo) {
        return $http.get(API.url + '/v1/storage/presignedurl/read', {
          params: {
            key: photo
          }
        });
      }

      function getForWrite(extension, contentType) {
      return $http.get(API.url + '/storage/presignedurl/write', {
        params: {
          ext: extension,
          cType: contentType
        }
      });
    }

    function getForPublicWrite(extension, contentType) {
      return $http.get(API.url + '/v1/storage/presignedurl/write', {
        params: {
          ext: extension,
          cType: contentType
        }
      });
    }


    function put(presignedUrl,imgBuffer,file) {
      return $http({
        method: 'PUT',
        url: presignedUrl,
        data: new Uint8Array(imgBuffer),
        transformRequest: angular.identity,
        headers: {'Content-Type': 'multipart/form-data',
        's3Request':"undefined"

      }
      });
    }

    function putX(presignedUrl, imgBuffer, img) {
    return $http( {
      method: 'PUT',
      url: presignedUrl,
      data: new Uint8Array(imgBuffer),
      transformRequest: angular.identity,
      headers: {
        'Content-Type': img.type,
        's3Request' : 'miao'
      }
    });
  }

    function upLoadFileS3(file, extension, type) {
      console.log(file.size);
        console.log(extension);
        console.log(type);
      return getForPublicWrite(extension, type).success(function(response, status, headers, config) {
        if (response.result.signedUrl) {
          console.log(response);
          var avatarFilename = response.result.filename;
          console.log("avatarFilename"+avatarFilename);
          var reader = new FileReader();
          reader.onload = function(e) {
          //console.log(response.result.signedUrl);
            //var formData = new FormData();
          //  formData.append('file', file);
            put(response.result.signedUrl,reader.result, file)
            .success(function(putResponse, putStatus, putHeaders, putConfig) {
              console.log("succes");
            })
            .error(function(putResponse, putStatus, putHeaders, putConfig) {
              alert("Errore #" + putStatus);
            });
      };


      // read image buffer
      reader.readAsArrayBuffer(file);
    }
      })

  }

}
})();
