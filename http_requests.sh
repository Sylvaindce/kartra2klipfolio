curl -d '
{
    "lead":{
        "id": "1",
        "first_name": "John",
        "middle_name": "Doe",
        "last_name": "Doe",
        "last_name2": "Doe",
        "email": "johndoe1@gmail.com",
        "phone_country_code": "+1",
        "phone": "1234567",
        "company": "company",
        "address": "address",
        "city": "New York",
        "zip": "1234",
        "state": "state",
        "country": "United States",
        "date_joined": "2018-04-26 00:00:00",
        "website": "http://www.example.com",
        "ip": "127.0.0.1",
        "ip_country": "United States",
        "facebook": "facebook",
        "twitter": "twitter",
        "linkedin": "linkedin",
        "google_plus": "google_plus",
        "sales_tax_id": "1234",
        "lead_picture": "http://www.example.com",
        "source": "0",
        "score": "0",
        "lead_deleted": "0",
        "lead_deleted_date": "2018-04-26 00:00:00",
        "referring_id": "0", 
        "blacklisted": "0",    
        "source_id": "0"        
    },
    "action":"list_subscription",
    "action_details":{
        "list":{
            "list_id":1,
            "list_name":"list 1"
        }
    }
}' -H "Content-Type: application/json" http://127.0.0.1:3000/add_user