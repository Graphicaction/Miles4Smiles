import React, {Component} from "react";
import Script from "react-load-script";

class SearchBusiness extends Component {
  constructor(props){
    super(props);

    this.state ={
      city: '',
      query:''
    };
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete 
  const options = { types: ['(cities)'] }; 
  
  // Initialize Google Autocomplete 
  /*global google*/
  this.autocomplete = new google.maps.places.Autocomplete(
                        document.getElementById('autocomplete'),
                        options );
  // Avoid paying for data that you don't need by restricting the 
  // set of place fields that are returned to just the address
  // components and formatted address
  this.autocomplete.setFields(['address_components', 'formatted_address']);
  // Fire Event when a suggested name is selected
  this.autocomplete.addListener('place_changed', this.handlePlaceSelect); 
}

  handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return(
    <div>
      <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&libraries=places`} onLoad={this.handleScriptLoad} />
        <form className="form-inline my-2 my-lg-0">
        <input id="autocomplete" className="form-control mr-sm-2" type="search" placeholder="SearchBusiness" aria-label="Search" value={this.state.query} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search for a Local Business</button>
      </form>
    </div>
    );
  }
};

export default SearchBusiness;