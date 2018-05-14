# CMB Draggable Repeater

jQuery plugin which allows CMB2 repeatable fields to be sorted by drag and drop within WordPress.

## Requirements

* CMB2 plugin
* JQuery UI Sortable needs to be enqueued.

## To Use

Adding your admin script with this script as a dependency, and adding this script with 
jQuery UI Sortable as a dependency.

```php
add_action( 'admin_enqueue_scripts', 'my_admin_scripts' );

function my_admin_scripts() {

    wp_enqueue_script(
        'mytheme_admin',
        'http://example.com/wp-content/themes/mytheme/admin.js',
        [ 'jQuery', 'cmbdragrepeat' ],
        '',
        true
    );
    wp_enqueue_script(
        'cmbdragrepeat',
        'http://example.com/wp-content/themes/mytheme/cmb-draggable-repeater.js',
        [ 'jquery-ui-sortable' ],
        '',
        true
    )
}
```

`admin.js` might look like this:

```JavaScript
jQuery( function ( $ ) {
    // this is the default way to find all repeaters.
    $( '.cmb-repeat' ).cmbDraggableRepeater();
} );
```

By default, this script will use the following object to find children within the jQuery object it is passed:

```
{
    sort: '.cmb-tbody'       // sortable() is invoked on this selector
    row:  '.cmb-repeat-row'  // row selector for individual items
    item: '[data-iterator]   // actual input field in the row
}
```

You can pass `cmbDraggableRepeater` either:
* a single selector string, which will be used instead of `.cmb-tbody` to invoke the sorter
* an object which will be merged with the default object

If a sort is performed, this script will dispatch a `cmb_drag_sort` event to the `Window` object. By examining 
the `details` property of the event, you can discover:

* `0`: jQuery object passed to this script
* `1`: jQuery object invoked by `sortable`
* `swapped`: An array of arrays. Each array represents the old/new positions in the `sortable` for all items

For example, examining the `swapped` property after moving the sixth item of a six-item list to 
be the third item would reveal this:

```
swapped: [
   [0,0],
   [1,1],
   [2,5],
   [3,2],
   [4,3],
   [5,4]
]
```

Note that the `swapped` array is created anew on every drag, and that the event is fired after every drag. 

## Revisions

1.0 Initial Version