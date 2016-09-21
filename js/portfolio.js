var $tagGrid = $('.tag-grid').isotope({
    // options
    itemSelector: '.tag-grid-item',
    layoutMode: 'fitRows',

    getSortData: {
        name: '.tag-grid-item-name',
        count: '.tag-grid-item-count parseInt',
    },
});

// sort items on button click
$('.tag-grid-sort-by-button-group').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $tagGrid.isotope({
        sortBy: sortByValue,
        sortAscending: {
            name: true,
            count: false,
        },
    });
});
