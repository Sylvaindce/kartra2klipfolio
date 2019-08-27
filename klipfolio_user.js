class klipfolio_user {

    constructor(json_info) {
        //process.env["NO_PROXY"]="";

        this.__request = require("request");
        this.__config = require("./config.json");
        this.__base_url  = this.__config.klipfolio.api_url;
        this.__kf_api_key = this.__config.klipfolio.api_key;

        this.__description = this.__config.klipfolio.default_description;
        this.__status = this.__config.klipfolio.default_user_status;
        this.__trial_days = this.__config.klipfolio.default_trial;
        this.__roles = this.__config.klipfolio.default_user_role;

        //this.__processes = [this.__get_client, this.__create_client, this.__enable_direct_billing, this.__extend_trial, this.__add_user];

        if (json_info) {
            this.__initialize(json_info);
            this.__create_client();
           
            /*for (process of this.__processes) {
                process.bind(this)();
            }*/
        }
    }

    __initialize(json_info) {
        var properties = [ "name", "email", "first_name", "last_name" ];

        for (const value of properties) {
            var exec_str = `this.${value} = "${json_info[value]}";`;
            new Function(exec_str).bind(this)();
        }
        console.log(this.name, this.first_name, this.last_name, this.email);
    }

    set id(id) {
        this.__id = id;
        this.__enable_direct_billing();
    }

    get id() { return this.__id; }

    set name(name) { this.__name = name; }

    get name() { return this.__name; }

    set description(description) { this.__description = description; }

    get description() { return this.__description; }

    set status(status) { this.__status = status; }

    get status() { return this.__status; }

    set trial_days(trial_days) { this.__trial_days = trial_days; }

    get trial_days() { return this.__trial_days; }

    set first_name(first_name) { this.__first_name = first_name; }

    get first_name() { return this.__first_name; }

    set last_name(last_name) { this.__last_name = last_name; }

    get last_name() { return this.__last_name; }

    set roles(roles) { this.__roles = roles; }

    get roles() { return this.__roles; }

    set email(email) { this.__email = email; }

    get email() { return this.__email; }

    __get_client() {
        this.__request.get({
            url: `${this.__base_url}clients`,
            headers: {
                "kf-api-key" : this.__kf_api_key,
                "Content-Type": "application/json"
            }
         }, this.callback.bind(this));
    }

    __create_client() {
        this.__request.post({
            url: `${this.__base_url}clients`,
            headers: {
                "kf-api-key" : this.__kf_api_key,
                "Content-Type": "application/json"
            },
            json: {
                "name" : this.name,
                "description" : this.description,
                "status" : this.status
            }
         }, this.callback.bind(this));
    }

    __enable_direct_billing() {
        this.__request.post({
            url: `${this.__base_url}clients/${this.id}/@/enable_direct_billing`,
            headers: {
                "kf-api-key" : this.__kf_api_key,
                "Content-Type": "application/json"
            },
            form: null
         }, this.callback.bind(this));
         console.log(`${this.__base_url}clients/${this.id}/@/enable_direct_billing`);
    }

    __extend_trial() {
        this.__request.post({
            url: `${this.__base_url}clients/${this.id}/@/extend_trial`,
            headers: {
                "kf-api-key" : this.__kf_api_key,
                "Content-Type": "application/json"
            },
            json: {
                "days" : this.trial_days
            }
         }, this.callback.bind(this));
    }

    __add_user() {
        this.__request.post({
            url: `${this.__base_url}users/?send_email=true`,
            headers: {
                "kf-api-key" : this.__kf_api_key,
                "Content-Type": "application/json"
            },
            json: {
                "first_name" : this.first_name,
                "last_name" : this.last_name,
                "roles" : [this.roles, ],
                "email" : this.email,
                "client_id" : this.id
            }
         }, this.callback.bind(this));
    }

    callback(err, res, body) {
        //console.log("err", err);
        //console.log(res);
        console.log("body", body);
        if (!err && res.statusCode == 201) {
            if (body.meta.location.includes("clients")) {
                this.id = body.meta.location.replace("/clients/", "");
            }
        }
        else if (!err && res.statusCode == 200) {
            try {
                var tmp = JSON.parse(body);
            }
            catch {
                //var tmp = {data: {op_requested: ""}};
                var tmp = body;
            }
                        
            if (tmp.data.op_requested === "enable_direct_billing") {
                this.__extend_trial();
            }
            else if (tmp.data.op_requested === "extend_trial") {
                this.__add_user();
            }
        }

    }

}

module.exports = klipfolio_user;