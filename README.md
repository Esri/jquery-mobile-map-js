jquery-mobile-map-js
=================

A lightweight mobile helper library that automatically recenters the map after phone orientation changes and view transitions. Use it with single and multiple view jQuery mapping apps.

Without this library, a map may perform inconsistently or break when a user rotates a device on the map page or child pages. 

##How to use?

		var helper = new jQueryHelper(/* esri.map */ map);
		
##Features

* jQueryHelper.js - This library takes over the life cycle of the map when users navigate to a child view. 
* Two samples - index.html is a single page mobile app and index_twopage.html demonstrates a two page mobile app.
* Helper methods for handling more complex user interface situations that require manipulation of height and width.
* Custom jQuery event "helper-map-loaded" - notifies you when map has been recreated so that you can redraw or requery features as appropriate.


##Dependencies
* ArcGIS API for JavaScript
* jQuery and jQuery Mobile

## Resources

* [ArcGIS Developers](http://developers.arcgis.com)
* [ArcGIS REST Services](http://resources.arcgis.com/en/help/arcgis-rest-api/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Your feedback can make the difference between an okay project and an amazingly awesome project. Please see our [guidelines for contributing](https://github.com/esri/contributing).


## Licensing
Copyright 2013 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[](Esri Tags: ArcGIS Web Mapping Editing FeatureServices Offline)
[](Esri Language: JavaScript)


