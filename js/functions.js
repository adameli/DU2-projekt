
// G
// CODE According to specification
function click_filter_element(event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.stopPropagation()
  const filter_dom = event.currentTarget;
  filter_dom.classList.toggle('selected');

  // console.log(filter_dom);
  update_programmes();
}


// G
// CODE according to specification
function create_filter_element(data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

  const klass = data.class;
  const textcontent = data.textContent;
  const parent = data.parent;

  const new_element = document.createElement("li")
  new_element.classList.add(klass)
  parent.append(new_element)
  new_element.textContent = textcontent

  new_element.addEventListener("click", click_filter_element)

  return new_element

}


// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
  filter_container_dom.addEventListener("click", toggle_filter_elements)
  function toggle_filter_elements(event) {
    let filter_elements = document.querySelectorAll(`#${event.currentTarget.id} .filter_list > li`)
    for (let element of filter_elements) {
      if (element.className === "selected") {
        element.classList.remove("selected")
      } else {
        element.classList.add("selected")
      }
    }

    if (filter_elements[0].className === "selected") {
      for (let element of filter_elements) {
        element.classList.add("selected")
      }
      update_programmes()
    } else {
      for (let element of filter_elements) {
        element.classList.remove("selected")
      }
      update_programmes()
    }
  }
}


// VG
// CODE according to specifications
function toggle_cities(event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters() {

  /*
    ARGUMENTS
      Funktionen tar inte emot några argument

    SIDE-EFFECTS
      Anropar funktionen array_each med en array och en funktion som argument

    RETURN VALUE
      Returnerar undefined
*/

  function create_country(country) {

    /*
      ARGUMENTS
        Funktionen tar emot ett argument:
        country (objekt): en av de objekten från COUNTRIES
  
        Ingen kontroll görs
  
      SIDE-EFFECTS
        Funktionen: skapar ett dom element med tagen "div"
        Ger dom elementet två stycken klasser 
        Ger dom elementet ett id 
        Appendar dom till ett element
        Skapar dom elements innerHTML, ett <h1> med objektets namn och ett <ul> element med en klass
        Skapar en nya "array" (cities) med de städerna som har likadant id som objektets id
        Anropar en functionen array_each med 'cities' och funktionen create_city som argument
  
      RETURN VALUE
        Returnerar undefined
  
    */
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city(city) {

    /*
      ARGUMENTS
        Funktionen tar emot ett argument:
        city (objekt): en av de objekten från 'cities'

        Ingen kontroll görs

      SIDE-EFFECTS
        Funktionen skapar en variabel "dom"
        "dom" inehåller ett nytt element som skapas med hjälp av funktionen create_filter_element
        "doms" datasets id får ett nytt värde som är "city"s (objektet) id 

      RETURN VALUE
        Returnerar undefined 

    */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;


  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
function create_levels_filter() {
  function create_level(level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter() {
  function create_subject(subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter() {
  function create_element(data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}

function create_diff_filter_element() {

  /*

  ARGUMENT
    funktionen tar inte emot något argument

  SIDE-EFFECTS
    Denna function skapar filter-element för respektive array (LEVELS, SUBJECTS, LANGUAGES) som finns i array_of_filters
    För varje objekt i arraeyrna anropas create_filter_element som skapar och appendar elementet till webbsidan
    
  NO RETURN VALUE

*/
  const array_of_filters = [LEVELS, SUBJECTS, LANGUAGES]
  const id_name = ['level', 'subject', 'language']
  function create_filter(object) {
    const dom = create_filter_element({
      parent: document.querySelector(`#${id_name[i]}_filter > ul`),
      class: "selected",
      textContent: object.name,
    });
    dom.dataset.id = object.id;
  }
  let i = 0
  while (i < array_of_filters.length) {
    array_each(array_of_filters[i], create_filter)

    i++
  }
}

// G / VG (see details in specification)
// CODE according to specifications
function create_programme(programme) {

  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */
  let programe_languages = get_programme_info(LANGUAGES, programme.languageID)
  let programe_subject = get_programme_info(SUBJECTS, programme.subjectID)
  let programe_level = get_programme_info(LEVELS, programme.levelID)
  let programe_university = get_programme_info(UNIVERSITIES, programme.universityID)
  let programe_city = get_programme_city(CITIES)
  let programe_country = get_programme_country(COUNTRIES)

  function get_programme_info(array, programID) {
    return array_find(array, test_programme_info)
    function test_programme_info(info_objekt) {
      return programID === info_objekt.id
    }
  }
  function get_programme_city(array) {
    let university = get_programme_info(UNIVERSITIES, programme.universityID)
    return array_find(array, test_function)
    function test_function(city_objekt) {
      return university.cityID === city_objekt.id
    }
  }
  function get_programme_country(array) {
    let city = get_programme_city(CITIES)
    return array_find(array, test_function)
    function test_function(country_objekt) {
      return city.countryID === country_objekt.id
    }
  }


  const program_dom = document.createElement("li")
  program_dom.classList.add('programme')
  const program_contianer = document.querySelector("#programmes > ul").append(program_dom);
  program_dom.innerHTML = `
        <div class=""><div> <b>${programme.name}</b> <br> ${programe_university.name} <br> ${programe_city.name}, ${programe_country.name} <br> ${programe_level.name}, ${programe_subject.name}, ${programe_languages.name} </div></div>
        <div class="more_info"></div>
        <div class="bottom_programme programme">${programe_city.name}, sun-index: ${programe_city.sun}</div>
    `
}


// G
// CODE according to the specification
function update_programmes() {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */
  let array_with_programmes = read_filters()
  document.querySelector("#programmes > ul").innerHTML = ""
  let text = document.querySelector("#programmes p")

  if (array_with_programmes.length !== 0) {
    array_each(array_with_programmes, create_programme)
    text.innerHTML = ""
  }

}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters() {

  /*
        ARGUMENTS
          Funcktionen tar inte emot några argument
  
        SIDE EFFECTS
          Funktionen går igenom och filtrerar de elementen som är selecterade
          city_id_selected består av de städerna som är selecterade, där varje index är varje stads id
          För varje element i city_id_selected loppas arrayen UNIVERSITES och kontrollerar om elementets siffra är likadan med något av UNIVERISTES objekts city-id
          om Sant pushas de objektet in i en universities, om Falskt fortsätter loppen leta.
          Därefter loppas arrayen PROGRAMMES igenom och för varje programme-objekt kontrolleras det om något av objektens ID i universites är likadant med programme-objektets universitesID
          om Sant pushas de objektet in i arrayen 'programmes'
          Därefter kontrollerar level, subjekt och languaes utifrån vad för objekt som finns i arrayen 'programmes'
  
          Det finns även en sökruta som filtrerar utefter användarens input value, input valuet svarar endast på vad som finns i programmets namn
  
        RETURN VALUE
          Det returneras en array med de element/objekt som har filtrerats utefter vilka filter_element är selecterade
  
    */

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
