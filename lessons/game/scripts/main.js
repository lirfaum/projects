'use strict';

// include other files function
function include(fileName)
  {
    var pathToScripts = 'scripts/';
    document.write('<script type="text/javascript" src="'+ pathToScripts + fileName+ '"></script>');
  }


// includes

include('classes.js');
include('test.js');
