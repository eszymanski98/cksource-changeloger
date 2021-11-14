Changelog
=========

## [31.0.0](https://github.com/ckeditor/ckeditor5/compare/v30.0.0...v31.0.0) (2021-10-26)

### Features

* **mention**:  Added a configuration option for customizing the maximum number of items in the list after typing the trigger character. Closes #10479.
* **engine**:  The `DataController#get()` is now decorated and fires a `get` event on the method call. See #10505.
* **core**:  Introduced the `Command#affectsData` flag to indicate whether a given command should stay enabled in editor modes with restricted write permissions (e.g. read-only mode). Closes #10670.
*  Introduced support for configurable badges in the navigation tree.

### Bug fixes

* **utils**:  Properly stringify objects containing circular references in `CKEditorError`. Closes #4959.
* **ui**:  The `ContextualBalloon` positioning should use the dynamic `editor.ui.viewportOffset` value instead of static `config.ui.viewportOffset`. Closes #10597.
* **ui**:  InputTextView should update its #isEmpty property on every #input instead of #change to stay in sync. Closes #10431.
* **table**:  The `SelectColumnCommand` and `SelectRowCommand` should work properly in editor modes with restricted write permissions (e.g. read-only mode). See #10635.
* **table**:  Color dropdown buttons in the table properties form should not be misaligned in Safari. Closes #10589.
* **source-editing**:  Improve source editing textarea field size and scrolling behaviour. Closes #10422.
* **source-editing**:  Calling `editor.getData()` while in the source editing mode should return the data from the source editor passed through the model. Closes #10505.
* **select-all**:  The `SelectAllCommand` should work properly in editor modes with restricted write permissions (e.g. read-only mode). Closes #10635.
* **restricted-editing**:  The feature should work properly in editor modes with restricted write permissions (e.g. read-only mode). Closes #10634.
* **mention**:  Mention panel will now hide when the editor becomes read-only. Closes #4645.
* **html-support**:  Adds HTML support for all headings given in the configuration of the headings feature. Closes #10539.
* **html-embed**:  Embed buttons should reflect the read-only state of the editor and the HTML embed command. Closes #10182.
* **find-and-replace**:  `FindCommand` and `FindNextCommand` should work properly in editor modes with restricted write permissions (e.g. read-only mode). Closes #10636.
* **find-and-replace**:  Do not replace find results removed by collaborators that landed in the `$graveyard` root.
* **engine**:  Makes order of markers in downcast data pipeline consistent. Thanks @bendemboski! Closes #10650.
* **engine**:  Blocked DOM selection updates in `Renderer` when the selection is made using the mouse. Limited random glitching in Chrome when the user starts selection in a link (or a marker) at the beginning of the block. Closes #10562.

### Other changes

* **media-embed, html-support**:  Enable experimental rendering in tests.
* **media-embed**:  Optimized the editing pipeline output of the [`Media#getViewElement()`](https://ckeditor.com/docs/ckeditor5/latest/api/module_media-embed_mediaregistry-Media.html#function-getViewElement)  view factory method.
* **html-support**:  Optimized the editing pipeline output of the [`createObjectView()`](https://ckeditor.com/docs/ckeditor5/latest/api/module_html-support_converters.html#function-createObjectView) view factory function.
* **engine**:  Made properties of `XmlDataProcessor` and `HtmlDataProcessor` public to allow overriding e.g. the HTML writer. Closes #10619.
* **engine**:  Introduced flag for experimental rendering mode for the editing view.
* **engine**:  Implemented the [`DomConverter#setContentOf()`](https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_domconverter-DomConverter.html#function-setContentOf) method to fill DOM elements with a filtered HTML source.
* **code-block**:  Makes three Enter clicks necessary at the end of a code block to escape it. Closes #6682.
*  Updated translations. [skip ci]

