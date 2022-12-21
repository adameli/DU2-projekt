"use strict";

create_diff_filter_element()
create_countries_cities_filters();


document.querySelector("#search_field button").addEventListener("click", update_programmes);

update_programmes();

let filter_containers = document.querySelectorAll("#others_filter > .filter_container");
array_each(filter_containers, add_group_toggling);

document.querySelector("#country_filter button").addEventListener("click", toggle_cities);

