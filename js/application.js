function displayData(apiData) {
    $('.item-container').empty();

    if (apiData.data.length === 0) {
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
        if (r.significanceStatement != undefined) {
            item.append('<h3>Significance Statement</h3> <p>' + r.significanceStatement + '</p>');
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

function loadDataForSearch(query) {
    var path = 'object?text=' + query;
    loadDataFrom(path)
}

$(document).on("keypress", "input", function (e) {
    if (e.key == 'Enter') {
        var searchQuery = $(this).val();
        loadDataForSearch(searchQuery);
    }
});
