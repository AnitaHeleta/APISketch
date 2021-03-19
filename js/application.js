function displayData(apiData) {
    for (i = 0; i < apiData.data.length; i++) {
        var r = apiData.data[i]
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

function loadDataFrom(urlPath) {
    var searchUrl = 'https://data.nma.gov.au/' + urlPath;
    $.getJSON(searchUrl, displayData);
}

function loadDataForSearch(query) {
    var url = 'object?text=' + query;
    loadDataFrom(url)
}

$(document).ready(function () {
    var searchQuery = 'aboriginal';
    loadDataForSearch(searchQuery);
});
