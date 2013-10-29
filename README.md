jquery-mobile-map-js
=================

A helper library for multiple view jQuery mapping apps. Allows users to re-orient the phone in child views and then safely reconstitutes the map.

It also ensures the map is centered properly during orientation changes.

##Why? 

It handles map orientation so you don't have to!

Without this library, maps perform inconsistently when a user navigates away from the map to a child view, rotates the phone and then returns to the map. It is a very common use case and this library provides a seamless solution.

##How to use?

See the included demo app: index_twopage.html.
		
##Features

* jQueryHelper.js - This library takes over the life cycle of the map when users navigate to a child view. Similar to native device operating systems, this library destroys the map when a user navigates away to another page and changes the orientation of the phone. The map is then added back to the application when the user returns to the view containing the map. The approach minimizes inappropriate map behavior and provides a significantly better user experience.
* jQuery event "helper-map-loaded" - notifies you when a map recreation event has occurred so that you can redraw or requery as appropriate.

##Dependencies
* ArcGIS API for JavaScript
* jQuery Mobile

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


