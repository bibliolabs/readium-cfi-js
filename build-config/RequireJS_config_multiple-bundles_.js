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

require.config({
    optimize: "none",
    generateSourceMaps: true,
    preserveLicenseComments: true,
    
    // Path is relative to this config file
    dir: process._readium.buildOutputPath + "build-output/_multiple-bundles",
    
    // Paths are relative to the above dir
    packages: [
    ],
    
    modules:
    [
        {
            name: "readium-cfi-js",
            exclude: ['jquery'],
            insertRequire: ["readium-cfi-js"]
        }
    ]
});