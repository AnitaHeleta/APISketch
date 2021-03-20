function displayData(apiData) {
    if (apiData.data.length === 0) {
        $('.item-container').empty();
        $('.item-container').append('<p>No Results found</p>');
        return;
    }

    for (const r of apiData.data) {
        var item = $(`<div class="item">
            <h2>${r.title}</h2>
            <h3>Description</h3>
            <p class="physdesc">${r.physicalDescription}</p>
            <h3>Type</h3>
            <p class="type">${r.additionalType}</p>
            <h3>Collection</h3>
            <p class="collection"> ${r.collection.title}</p>
        </div>`);

        if (r.significanceStatement) {
            item.append('<h3>Significance Statement</h3> <p>' + r.significanceStatement + '</p>');
        };
        var startDate = extractStartDate(r);
        if (startDate) {
            item.append('<h3>Period</h3> <p>' + startDate + '</p>');
        };
        var thumbnail = extractThumbnail(r);
        if (thumbnail) {
            item.append('<img src="' + thumbnail + '" class="thumbnail">');
        }
        $('.item-container').append(item);
    }

    if (apiData.links && apiData.links.next) {
        loadDataFrom(apiData.links.next);
    }
}

function extractStartDate(row) {
    if (row.temporal) {
        var event = _.findWhere(row.temporal, { type: "Event" })
        return event.title;
    }
    return undefined;
}

function extractThumbnail(row) {
    if (row.hasVersion) {
        var images = _.findWhere(row.hasVersion, { type: "StillImage" })
        var thumbnail = _.findWhere(images.hasVersion, { version: "thumbnail image" })
        return thumbnail.identifier;
    }
    return undefined;
}

function loadDataFrom(path) {
    var searchUrl = 'https://data.nma.gov.au/' + path;
    $.getJSON(searchUrl, displayData);
}

function searchByTitle(query) {
    $('.item-container').empty();
    var path = 'object?text=' + query;
    loadDataFrom(path)
}

function searchByCollection(query) {
    $('.item-container').empty();
    var path = 'object?collection=' + query;
    loadDataFrom(path)
}

$(document).on("keypress", "input", function (e) {
    if (e.key == 'Enter') {
        var searchBy = $("input[name='searchBy']:checked").val();
        var searchQuery = $(this).val();
        if (searchBy === 'title') {
            searchByTitle(searchQuery);
        } else if (searchBy === 'collection') {
            searchByCollection(searchQuery);
        }
    }
});
