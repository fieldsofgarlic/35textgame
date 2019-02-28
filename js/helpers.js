const directions = {
  n: "north",
  s: "south",
  e: "east",
  w: "west",
  u: "up",
  d: "down"
};

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
    if ( typeof fields[ 3 ] === "undefined" ) {
      fields[ 3 ] = "";
    }
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
  return locationDb;
}

function move ( locDb, direction ) {
  const dir = direction.slice( 0, 1 );
  const newLocation = locDb[ locDb.current ].destinations[ dir ];
  if ( newLocation === "" ) {
    return "You can't go " + direction + " from here.";
  }
  else {
    locDb.current = newLocation;
    return locDb[ newLocation ].description;
  }
}


function handleInput (input, grammar) {
  let output = "> " + input.value + "<br/>";
  output += interpreter( input.value, grammar ) + "<br/>";
  input.value = "";
  return output;
}

function interpreter (cmd, grammar) {
  cmd = cmd.toLowerCase().trim();
  let words = cmd.split( /\s+/ );
  if ( words[0] in grammar ) {
    
  }
  else {
    return "I don't know how to " + words[0] + ".";
  }
  return "you want to " + words[0] + "  a " + words[1];
}

function parseGrammar (data) {
  grammarDb = {};
  const lines = data.split( "\n" );
  for ( let i = 0; i < lines.length; i ++ ) {
    const fields = lines[ i ].split( "\s" );
    if ( typeof fields[ 1 ] === "undefined" ) {
      fields[ 1 ] = "";
    }
    const nouns = fields[ 1 ].split( "," );
    grammarDb[ fields[ 0 ] ] = nouns;
  }
  return grammarDb;
}