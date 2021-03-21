function displayData(apiData) {
    if (apiData.data.length === 0) {
        $('.item-container').empty();
        $('.item-container').append('<p>No Results found</p>');
        return;
    }
    var chunkedResults = _.chunk(apiData.data, 3)
    for (const resultsChunk of chunkedResults) {
        var section = buildSection(resultsChunk);
        $('.item-container').append(section);
    }

    if (apiData.links && apiData.links.next) {
        loadDataFrom(apiData.links.next);
    }
}

function buildSection(results){
    var s =  $('<div class="section">');
    var items = _.map(results, buildIndividualResult);
    s.append(items);
    return s;
}

function buildIndividualResult(r) {
    var item = $(`<div class="item col span_1_of_3">
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

    if (r.acknowledgement) {
        item.append('<h3>Acknowledgement</h3> <p>' + r.acknowledgement + '</p>');
    };

    var startDate = extractStartDate(r);
    if (startDate) {
        item.append('<h3>Period</h3> <p>' + startDate + '</p>');
    };
    var thumbnail = extractThumbnail(r);
    if (thumbnail) {
        item.append('<img src="' + thumbnail + '" class="thumbnail">');
    }
    return item;
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
    var path = getObjectPath(`text=${query}`);
    loadDataFrom(path)
}

function searchByCollection(query) {
    $('.item-container').empty();
    var path = getObjectPath(`collection=${query}`);
    loadDataFrom(path)
}

function searchByLocation(query) {
    $('.item-container').empty();
    var path = getObjectPath(`spatial=${query}`);
    loadDataFrom(path)
}

function getObjectPath(query) {
    return `object?limit=51&format=simple&apikey=4SDwv6pd4DyiBrJ5xu2PnVUmaLhIogIk&${query}`
}

function getLocationName(lat, long) {
    // my OpenCage Geocoder API key
    var geoApi = '33e3b3aefbaa415fa6393bcb1a1831e5';
    var geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=${geoApi}`;
    $.getJSON(geocodeUrl, function (locationData) {
        var suburb = locationData.results[0].components.suburb;
        localStorage.setItem('suburb', suburb);
    });
}

function findNearMe() {
    var suburb = localStorage.getItem('suburb');
    searchByLocation(suburb)
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

$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            getLocationName(pos.coords.latitude, pos.coords.longitude)
        });
    }
});
