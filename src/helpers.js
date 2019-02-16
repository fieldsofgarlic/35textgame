function readFile ( file ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      return this.responseText;
    }
  };
  xhttp.open("GET", file, true);
  xhttp.send();
}

function parseLocations ( data ) {
  locationDb = {};
  const lines = data.split( "\n" );
  for ( let i = 0; i < lines.length; i ++ ) {
    const fields = lines[ i ].split( "\t" );
    const destinations = fields[ 1 ].split( "," );
    const items = fields[ 3 ].split( "," );
    locationDb[ fields[ 0 ] ] = {
      destinations : {
        n : destinations[ 0 ],
        s : destinations[ 1 ],
        e : destinations[ 2 ],
        w : destinations[ 3 ],
        u : destinations[ 4 ],
        d : destinations[ 5 ]
      },
      description : fields[ 2 ],
      items : items
    };
  }
}
