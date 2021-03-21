# Designing for Data Informed User Experience


## API Sketch Project


Student: U3148005

Website: https://anitah3.sg-host.com  

Github: https://github.com/AnitaHeleta/APISketch

### Rationale
In this project I had to create a simple, responsive web application that loads dynamic data using JQuery and Javascript to load data from an API and displays it on the front end.

I chose to work with the National Museum of Australia (NMA)’s Web API in order to provide a simple search interface. The idea was to enable an experience which would allow the user to explore and discover facts about our national patrimony. 

Considering also project 2, I decided to concentrate on a simple initial search experience which would allow me to further develop it following an iterative approach.

The NMA API will provide the foundation of my user experience hence the first step was to understand its characteristics in terms of what data is provided and how easily it can be retrieved.
In this sense, the NMA website and the related Github project provides some documentation as well as an API Explorer. After registering and provisioning my API Key, I started to discover the API by using tools like Postman or directly in the browser. Ultimately having an API key is not strictly necessary to discover and use the API however having one allowed me to go around API restriction (call limits) as well as it allowed me to access information which is restricted to the public user.
Generally speaking, the API allow us to retrieve artifacts’ information such as title, author, date etc as well information about their location and/or their organisation in terms of museum collections etc.

Once I was satisfied with this step, I concentrated on learning JQuery strictly focusing on the parts that would allow the simple experience I had envisioned.

As I mentioned earlier, my initial goal is to provide a simple searching experience for the user.
In this sense, I started developing a search function which would allow the user to find museum’s artifacts by title or by a collection.

The user will type their search query e.g. tennis, aboriginal, etc in a dedicated search box and select the type of search via a radio button (by title or by collection).
After executing the query by hitting the “Enter” button, the user will be displayed a list of results.
I chose to limit the amount of information displayed to the user to the following fields: title, physical description, type, collection, significance statement, period, acknowledgment and a thumbnail of the artifact.

From a visual perspective, the results are organised in a 3-column grid. I also took in consideration some web responsive requirements by allowing the results to be displayed in a single column on smaller screens.

After the geolocalisation lesson, I decided to include a fun “find near me” button which would allow the user to retrieve all artifacts in their vicinity.

To keep things simple, I decided to limit this search to the user’s suburb and the results are displayed in the same grid as the search function. In later stages of the project, it would be interesting to explore a more visual representation for example on a map.

Displaying the web application on the front end I used simple and clean design, with a scrolling image, NMA logo and a simple Welcome message to the user.  The colour scheme I selected is green and black, inspired from the NMA colour scheme.  Typography I chose is Playfair Display for the main headings and open sans-serif for the content.
 



 







