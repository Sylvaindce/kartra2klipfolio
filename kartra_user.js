class kartra_user {

    constructor(json_answer) {
        if (json_answer) {
            console.log(json_answer);
            this.__initialize(json_answer);
        }
    }

    __initialize(json_answer) {
        var properties = Object.getOwnPropertyNames(kartra_user.prototype).filter(function(value, i, a) {
            var methods_to_remove = ["constructor", "__initialize"];
            if (!methods_to_remove.includes(value)) {
                return value;
            }
        });
        for (const value of properties) {
            var exec_str = `this.${value} = "${json_answer["lead"][value]}";`;
            new Function(exec_str).bind(this)();
        }
    }

    get klipfolio() {
        return {
            "name" : this.company,
            "first_name" : this.first_name,
            "last_name" : this.last_name,
            "email" : this.email
        };
    }

    set id(id) { this.__id = id; }

    get id() { return this.__id; }

    set first_name(first_name) { this.__first_name = first_name; }

    get first_name() { return this.__first_name; }

    set middle_name(middle_name) { this.__middle_name = middle_name; }

    get middle_name() { return this.__middle_name; }

    set last_name(last_name) { this.__last_name = last_name; }

    get last_name() { return this.__last_name; }

    set last_name_2(last_name_2) { this.__last_name_2 = last_name_2; }

    get last_name_2() { return this.__last_name_2; }

    set email(email) { this.__email = email; }

    get email() { return this.__email; }

    set phone_country_code(phone_country_code) { this.__phone_country_code = phone_country_code; }

    get phone_country_code() { return this.__phone_country_code; }

    set phone(phone) { this.__phone = phone; }

    get phone() { return this.__phone; }

    set company(company) { this.__company = company; }

    get company() { return this.__company; }

    set address(address) { this.__address = address; }

    get address() { return this.__address; }

    set city(city) { this.__city = city; }

    get city() { return this.__city; }

    set zip(zip) { this.__zip = zip; }

    get zip() { return this.__zip; }

    set state(state) { this.__state = state; }

    get state() { return this.__state; }

    set country(country) { this.__country = country; }

    get country() { return this.__country; }

    set date_joined(date_joined) { this.__date_joined = date_joined; }

    get date_joined() { return this.__date_joined; }

    set website(website) { this.__website = website; }

    get website() { return this.__website; }

    set ip(ip) { this.__ip = ip; }

    get ip() { return this.__ip; }

    set ip_country(ip_country) { this.__ip_country = ip_country; }

    get ip_country() { return this.__ip_country; }

    set facebook(facebook) { this.__facebook = facebook; }

    get facebook() { return this.__facebook; }

    set twitter(twitter) { this.__twitter = twitter; }

    get twitter() { return this.__twitter; }

    set linkedin(linkedin) { this.__linkedin = linkedin; }

    get linkedin() { return this.__linkedin; }

    set google_plus(google_plus) { this.__google_plus = google_plus; }

    get google_plus() { return this.__google_plus; }

    set sales_tax_id(sales_tax_id) { this.__sales_tax_id = sales_tax_id; }

    get sales_tax_id() { return this.__sales_tax_id; }

    set lead_picture(lead_picture) { this.__lead_picture = lead_picture; }

    get lead_picture() { return this.__lead_picture; }
}

module.exports = kartra_user;
