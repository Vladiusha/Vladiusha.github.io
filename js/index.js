function clear_fields() {
    document.getElementById('transport_type').value = "";
    document.getElementById('way_type').value = "";
    document.getElementById('trip_date').value = "";
    document.getElementById('transport_number').value = "";
    document.getElementById('place_departure').value = "";
    document.getElementById('time_departure').value = "";
    document.getElementById('place_arrival').value = "";
    document.getElementById('time_arrival').value = "";
}

function clear_rules() {
    let output_result = document.getElementById('output_result');
    if (output_result != null) {
        output_result.value = "";
    }
}

function change_date_format(date) {
    let date_arr = date.split('-');
    let year = date_arr[0];
    let month = '';
    let day = date_arr[2];

    switch (date_arr[1]) {
        case '01':
            month = 'Jan.';
            break;
        case '02':
            month = 'Feb.';
            break;
        case '03':
            month = 'Mar.';
            break;
        case '04':
            month = 'Apr.';
            break;
        case '05':
            month = 'May.';
            break;
        case '06':
            month = 'June.';
            break;
        case '07':
            month = 'July.';
            break;
        case '08':
            month = 'Aug.';
            break;
        case '09':
            month = 'Sept.';
            break;
        case '10':
            month = 'Oct.';
            break;
        case '11':
            month = 'Nov.';
            break;
        case '12':
            month = 'Dec.';
            break;
        default:
            break;
    }
    return `${day} ${month} ${year}`;
}

function add_rule() {
    let transport_type = document.getElementById('transport_type');
    let way_type = document.getElementById('way_type');
    let trip_date = document.getElementById('trip_date');
    let transport_number = document.getElementById('transport_number');
    let place_departure = document.getElementById('place_departure');
    let time_departure = document.getElementById('time_departure');
    let place_arrival = document.getElementById('place_arrival');
    let time_arrival = document.getElementById('time_arrival');

    let transport_type_value = transport_type != null ?  transport_type.value : '';
    let way_type_value = way_type != null ?  way_type.value : '';
    let trip_date_value = trip_date != null ?  trip_date.value : '';
    let transport_number_value = transport_number != null ?  transport_number.value : '';
    let place_departure_value = place_departure != null ?  place_departure.value : '';
    let time_departure_value = time_departure != null ?  time_departure.value : '';
    let place_arrival_value = place_arrival != null ?  place_arrival.value : '';
    let time_arrival_value = time_arrival != null ?  time_arrival.value : '';


    if (transport_type_value === ""
        || way_type_value === ""
        || trip_date_value === ""
        || transport_number_value === ""
        || place_departure_value === ""
        || time_departure_value === ""
        || place_arrival_value === ""
        || time_arrival_value === ""
    ) {
        alert('There is at least one empty field. Every field should to be filled.');
        return false;
    }

    let result = `<b>${transport_type_value} ${change_date_format(trip_date_value)}</b><br><u>${transport_type_value.substring(0, (transport_type_value.length - 2))}</u><br>${transport_number_value} ${place_departure_value} ${time_departure_value} ${place_arrival_value} ${time_arrival_value}<br>`;


    let output_result = document.getElementById('output_result');
    if (output_result != null) {
        output_result.value += result;
    }

    clear_fields();

    return false;
}