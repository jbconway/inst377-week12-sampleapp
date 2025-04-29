const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Your Supabase key here
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get('/customers', async(req,res) => {
    console.log("attempting to get all customers");
    const { data, error } = await supabase.from('customers').select();
    res.send(data);
  
});

app.post('/customer', async(req,res) => {
    console.log('adding a customer');
    console.log(req.body);

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const { data, error } = await supabase.from('customer').insert({ customer_first_name : firstName, customer_last_name: lastName, customer_state: state }).select();
    res.send(data);

});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
} );