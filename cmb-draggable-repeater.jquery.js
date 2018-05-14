/**
 * Allows repeatable fields (not groups, though it might work on groups, untested) to be sorted via drag and drop.
 *
 * @summary   Allows CMB2 repeatable fields to be sorted via drag and drop.
 * @external  jQuery.fn
 * @author    Roger Los
 * @link      https://github.com/rogerlos
 * @version   1.0
 */
(function( $ ) {

    $.fn.cmbDraggableRepeater = function( OPT ) {

        OPT = typeof( OPT ) === 'undefined' ? {} : ( typeof( OPT ) === 'string' ? { sort: OPT } : OPT );

        let CFG   = $.extend( {
                sort: '.cmb-tbody',
                row: '.cmb-repeat-row',
                item: '[data-iterator]'
            }, OPT ),
            $SORT = $( this ).find( CFG.sort ),
            THIS  = this;

        if ( ! $SORT.length ) return this;

        $SORT.sortable( {
            stop : function () {

                // find items, set counter to 0
                let $items = $SORT.find( CFG.row ).find( CFG.item ),
                    i = 0,
                    swapped = [],
                    EVENT;

                // if there are no items, falls back to using top-level dom elements below $SORT
                if ( ! $items.length ) $items = $SORT.children();

                $items.each( function() {

                    let $this = $( this ),
                        idstr = $this.attr( 'id' ).split( '_' ),
                        id = idstr.pop(),
                        nm = $this.attr( 'name' );

                    // add the old:new relationship to the event
                    swapped.push( [ id, i ] );

                    // old ID was removed in the "let" statement; add new ID and turn back into string
                    idstr.push( i );
                    idstr = idstr.join( '_' );

                    // Set 'id' and 'name' attributes to reflect new ID
                    $this.attr( 'id', idstr );
                    $this.attr( 'name', nm.replace( ( '[' + id + ']' ), ( '[' + i + ']' ) ) );

                    // if using 'data-iterator' to find the items, update that attribute.
                    if ( CFG.item === '[data-iterator]' ) $this.attr( 'data-iterator', i ).data( 'iterator', i );

                    i ++;
                });

                EVENT = new CustomEvent( 'cmb_drag_sort', { detail: {
                    0: THIS,
                    1: this,
                    swapped: swapped
                } } );

                $SORT.closest( '.cmb-repeat-table' ).dispatchEvent( EVENT );
            }
        } );

        return this;
    };
}( jQuery ));