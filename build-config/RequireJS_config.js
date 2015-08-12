//  Copyright (c) 2014 Readium Foundation and/or its licensees. All rights reserved.
//  
//  Redistribution and use in source and binary forms, with or without modification, 
//  are permitted provided that the following conditions are met:
//  1. Redistributions of source code must retain the above copyright notice, this 
//  list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice, 
//  this list of conditions and the following disclaimer in the documentation and/or 
//  other materials provided with the distribution.
//  3. Neither the name of the organization nor the names of its contributors may be 
//  used to endorse or promote products derived from this software without specific 
//  prior written permission.

(
function(thiz){
    
    console.log("========> RJS bootstrap ...");
    
    //console.log(thiz);
    console.log(process.cwd());
    //console.log(process.env);



    // relative to process.cwd()
    process._RJS_Path_RelCwd__CopiedSourcesDir = "/build-output/_SOURCES";
    
    // relative to this config file
    process._RJS_baseUrl = ".." + process._RJS_Path_RelCwd__CopiedSourcesDir;
    
    // relative to the above baseUrl (resolved absolute path is equivalent to process.cwd())
    process._RJS_Path_RelBaseUrl__readium_cfi_js_RootDir = "../..";
    
    
    

    var args = process.argv.slice(3);
    console.log(args);
   
    // relative to process.cwd(), folder that contains this config file
    var configDir = args[0];
    var i = configDir.lastIndexOf("/");
    configDir = configDir.substr(0, i);
    console.log(configDir);
    process._RJS_Path_RelCwd__ConfigDir = configDir;
    
    
     // single or multiple bundle target
    var configBundleType = args[1];
    configBundleType = configBundleType.substr("--rjs_bundle=".length);
    console.log(configBundleType);
    process._RJS_isSingleBundle = (configBundleType === "single" ? true : false);
    
    
    // relative to this config file, array of mainConfigFile(s)
    var mainConfigFile = args[2];
    mainConfigFile = mainConfigFile.substr("--rjs_mainConfigFile=".length);
    mainConfigFile = mainConfigFile.split(',');
    console.log(mainConfigFile);
    process._RJS_mainConfigFile = mainConfigFile;


    // relative to process.cwd(), array of source folders
    var sources = args[3];
    sources = sources.substr("--rjs_sources=".length);
    sources = sources.split(',');
    console.log(sources);

    
    var dest = '';
    
    var req = requirejs({
        context: 'build'
    });
    var nodeFile = req('node/file');
    
    var regExpFilter= /\w/;
    var onlyCopyNew = false;

    var destDir = process.cwd() + process._RJS_Path_RelCwd__CopiedSourcesDir + (dest ? dest : '');
    console.log("========> copySources");
    console.log(destDir);
    
    for (var i = 0; i < sources.length; i++) {
        var source = sources[i];
        
        var srcDir = process.cwd() + source;

        nodeFile.copyDir(srcDir, destDir, regExpFilter, onlyCopyNew);
    }
    
    
    //process.exit(1);
    //throw new Error("HALT");
    
    return true;
}(this)
?
{
    baseUrl: process._RJS_baseUrl,
    
    mainConfigFile: process._RJS_mainConfigFile,
    
    optimize: "none",
    generateSourceMaps: true,
    preserveLicenseComments: true,
    
    /*
    optimize: "uglify2",
    generateSourceMaps: true,
    preserveLicenseComments: false,

    // uglify2: {
    //   mangle: true,
    //   except: [
    //         'zzzzz'
    //   ],
    //   output: {
    //     beautify: true,
    //   },
    //   beautify: {
    //     semicolons: false
    //   }
    // },
    */

    inlineText: true,
    stubModules: [],
    
    //xhtml: true, //document.createElementNS()
    
    /* http://requirejs.org/docs/api.html#config-waitSeconds */
    waitSeconds: 0,
    
    removeCombined: true,
    
    //findNestedDependencies: true,
            
    wrap: false,
    
    wrapShim: false,

    normalizeDirDefines: 'all',
    
    onBuildRead: function (moduleName, path, contents) {
        //console.log("onBuildRead: " + moduleName + " -- " + path);
        
        return contents;
    },
    
    onBuildWrite: function (moduleName, path, contents) {
        //console.log("onBuildWrite: " + moduleName + " -- " + path);
        
        return contents;
    },
    
    // MUST be in root config file because of access to context-dependent 'config'
    onModuleBundleComplete: function(data) {
        
        var filePath = process.cwd()
            + "/"
            + process._RJS_Path_RelCwd__ConfigDir
            + "/RequireJS_function_"
            + (process._RJS_isSingleBundle ? "single-bundle" : "multiple-bundles")
            + "_complete.js";
        
        var fs = nodeRequire("fs");
        fs.readFile(
            filePath,
            {encoding: 'utf-8'},
            function(err, fileContents) {
                if (!err) {
                    var func = eval("("+fileContents+")");
                    return func(data);
                } else {
                    console.log(err);
                }
            }
        );
    }
}
:
function(){console.log("NOOP");return {};}()
)