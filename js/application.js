$(document).ready(function(){

    //need NMA API Key
    //https://www.nma.gov.au/about/our-collection/our-apis
    //docs: https://github.com/NationalMuseumAustralia/Collection-API/wiki/Getting-started

    //my API key

    var key = 'aGyOTzAchbsscZt7OnZQ4hSvgSsiW0hW'

    //api call 
    //api call is made to all the objects in the NMA of the Aboriginal Collection
    var url = 'https://data.nma.gov.au/object?limit=&collection=aboriginal&format=simple&apikey=' + key;

    
       $.getJSON(url, function(data) {
        console.log(data);

    //objects title, physical description, contributor by collections    
    var item = data.data[0];
    var description = data.data[0];
    var contributor = data.data[0].contributor[0].title;
    var medium = data.data[0].medium[0].type;
    var mediumtitle = data.data[0].medium[0].title;
    var significanceStatement = data.data[0].significanceStatement;
    var image = data.data[0]._meta.hasFormat;
      

    console.log (item.title);
    console.log (description.physicalDescription);

// They dont work in the console//

    // console.log (contributor.title);
    // console.log (medium[0].type);
    // console.log (mediumtitle.title);
    // console.log (significanceStatement.significanceStatement);
    
        $('.title').html (item.title);
        $('.physdesc').html (description.physicalDescription);
        $('.contributor').html (contributor);
        $('.medium').html (medium);
        $('.mediumtitle').html (mediumtitle);
        $('.significanceStatement').html (significanceStatement);
        $('.image').html (image);

    });

});