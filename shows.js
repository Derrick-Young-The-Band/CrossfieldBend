/*
  CROSSFIELD BEND: THE SHOW LIST
  ==============================
  This file is the only place show dates live. The home page (Next stop sign,
  show rows, Recent shows, Google event data) and the press kit's
  "Upcoming shows" list are all built from it.

  To add a show
    1. Copy one of the { ... } blocks below, including the comma after it.
    2. Change the details. Keep the quotes.
    3. Save, commit and push. The site updates on its own.

  The fields
    title   What the night is called, e.g. "Tuesday Night Music Club".
            If it has no special name, use the venue name again.
    venue   The room, e.g. "Roc'n Doc's".
    addr    Street, city, province, e.g. "105 Lakeshore Rd E, Mississauga, ON".
    area    The neighbourhood people know it by, e.g. "Port Credit".
    start   When it starts: "YYYY-MM-DDTHH:MM:00-05:00".
    end     When it ends, same format. Leave this line out if there is no set end;
            the sign then shows only the start time.
            Use -05:00 from early November to mid March (winter time)
            and -04:00 from mid March to early November (summer time).
            11 PM on Dec 1 2026 is "2026-12-01T23:00:00-05:00".
    poster  Optional. A picture in the assets folder, e.g. "assets/poster.jpg".
    tag     Optional. A short label, e.g. "Jam".
    note    Optional. A second line under the address, e.g. "Roast beef dinner 5–7".

  Order does not matter. A show hides itself as soon as its end time passes,
  and the four most recent past shows appear in a small "Recent shows" line.
  To remove a show, delete its block.
*/
window.CFB_SHOWS = [
  {
    title: "Maurie's Movember Bender",
    venue: "McLaughlin's Pub",
    addr: "136 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2026-11-21T19:00:00-05:00",
    tag: "Full band",
    note: "With Mimico Bill and the brothers McConnell · formerly The Donegal Arms",
    poster: "assets/mclaughlins-2026-11-21.jpg"
  },
  {
    title: "Tuesday Night Music Club",
    venue: "Roc'n Doc's",
    addr: "105 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2026-12-01T19:30:00-05:00",
    end: "2026-12-01T23:00:00-05:00",
    poster: "assets/poster-tnmc.jpg"
  },
  {
    title: "House of Musical Redemption",
    venue: "ANAF",
    addr: "765 Third St, Mississauga, ON",
    area: "Mississauga",
    start: "2026-12-06T13:00:00-05:00",
    end: "2026-12-06T16:00:00-05:00",
    tag: "Jam",
    note: "First Sunday of the month · all jammers welcome",
    poster: "assets/poster-anaf.jpg"
  },
  {
    title: "Alexander Quail's Bad Santa",
    venue: "McLaughlin's Pub",
    addr: "136 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2026-12-10T20:00:00-05:00",
    tag: "Special guest appearance",
    note: "Formerly The Donegal Arms",
    poster: "assets/poster-2026-12-10.jpg"
  },
  {
    title: "Festival of Trees",
    venue: "Small Arms Inspection Building",
    addr: "1352 Lakeshore Rd E, Mississauga, ON",
    area: "Lakeview",
    start: "2026-12-12T12:30:00-05:00",
    end: "2026-12-12T16:30:00-05:00",
    poster: "assets/poster-2026-12-12.jpg"
  },
  {
    title: "Tuesday Night Music Club",
    venue: "Roc'n Doc's",
    addr: "105 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2026-12-15T19:30:00-05:00",
    end: "2026-12-15T23:00:00-05:00",
    poster: "assets/poster-tnmc.jpg"
  },
  {
    title: "Dave Woods' Christmas Show",
    venue: "The Moonshine Cafe",
    addr: "568 Kerr St, Oakville, ON",
    area: "Oakville",
    start: "2026-12-16T20:00:00-05:00",
    poster: "assets/poster-2026-12-16.jpg"
  },
  {
    title: "Port Credit Legion",
    venue: "Port Credit Legion",
    addr: "35 Front St N, Mississauga, ON",
    area: "Port Credit",
    start: "2026-12-18T17:30:00-05:00",
    end: "2026-12-18T20:30:00-05:00",
    note: "Fish and chips",
    poster: "assets/poster-2026-12-18.jpg"
  },
  {
    title: "Boxing Day Bender",
    venue: "McLaughlin's Pub",
    addr: "136 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2026-12-26T14:00:00-05:00",
    note: "Formerly The Donegal Arms",
    poster: "assets/poster-2026-12-26.jpg"
  },
  {
    title: "Tuesday Night Music Club",
    venue: "Roc'n Doc's",
    addr: "105 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2026-12-29T19:30:00-05:00",
    end: "2026-12-29T23:00:00-05:00",
    poster: "assets/poster-tnmc.jpg"
  },
  {
    title: "Polar Bear Dip",
    venue: "McLaughlin's Pub",
    addr: "136 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2027-01-01T13:00:00-05:00",
    note: "Formerly The Donegal Arms",
    poster: "assets/poster-2027-01-01.jpg"
  },
  {
    title: "House of Musical Redemption",
    venue: "ANAF",
    addr: "765 Third St, Mississauga, ON",
    area: "Mississauga",
    start: "2027-01-03T13:00:00-05:00",
    end: "2027-01-03T16:00:00-05:00",
    tag: "Jam",
    note: "First Sunday of the month · all jammers welcome",
    poster: "assets/poster-anaf.jpg"
  },
  {
    title: "Tuesday Night Music Club",
    venue: "Roc'n Doc's",
    addr: "105 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2027-01-12T19:30:00-05:00",
    end: "2027-01-12T23:00:00-05:00",
    poster: "assets/poster-tnmc.jpg"
  },
  {
    title: "Port Credit Legion",
    venue: "Port Credit Legion",
    addr: "35 Front St N, Mississauga, ON",
    area: "Port Credit",
    start: "2027-01-15T17:30:00-05:00",
    end: "2027-01-15T20:30:00-05:00",
    tag: "Every 3 weeks",
    note: "Special guest Mimico Bill",
    poster: "assets/poster-legion-fridays.jpg"
  },
  {
    title: "Port Credit Legion",
    venue: "Port Credit Legion",
    addr: "35 Front St N, Mississauga, ON",
    area: "Port Credit",
    start: "2027-02-05T17:30:00-05:00",
    end: "2027-02-05T20:30:00-05:00",
    tag: "Every 3 weeks",
    note: "Special guest Mimico Bill",
    poster: "assets/poster-legion-fridays.jpg"
  },
  {
    title: "Port Credit Legion",
    venue: "Port Credit Legion",
    addr: "35 Front St N, Mississauga, ON",
    area: "Port Credit",
    start: "2027-02-26T17:30:00-05:00",
    end: "2027-02-26T20:30:00-05:00",
    tag: "Every 3 weeks",
    note: "Special guest Mimico Bill",
    poster: "assets/poster-legion-fridays.jpg"
  },
  {
    title: "Port Credit Legion",
    venue: "Port Credit Legion",
    addr: "35 Front St N, Mississauga, ON",
    area: "Port Credit",
    start: "2027-03-19T17:30:00-04:00",
    end: "2027-03-19T20:30:00-04:00",
    tag: "Every 3 weeks",
    note: "Special guest Mimico Bill",
    poster: "assets/poster-legion-fridays.jpg"
  },
  {
    title: "Tuesday Night Music Club",
    venue: "Roc'n Doc's",
    addr: "105 Lakeshore Rd E, Mississauga, ON",
    area: "Port Credit",
    start: "2027-01-26T19:30:00-05:00",
    end: "2027-01-26T23:00:00-05:00",
    poster: "assets/poster-tnmc.jpg"
  },
  {
    title: "House of Musical Redemption",
    venue: "ANAF",
    addr: "765 Third St, Mississauga, ON",
    area: "Mississauga",
    start: "2027-02-07T13:00:00-05:00",
    end: "2027-02-07T16:00:00-05:00",
    tag: "Jam",
    note: "First Sunday of the month · all jammers welcome",
    poster: "assets/poster-anaf.jpg"
  },
  {
    title: "House of Musical Redemption",
    venue: "ANAF",
    addr: "765 Third St, Mississauga, ON",
    area: "Mississauga",
    start: "2027-03-07T13:00:00-05:00",
    end: "2027-03-07T16:00:00-05:00",
    tag: "Jam",
    note: "First Sunday of the month · all jammers welcome",
    poster: "assets/poster-anaf.jpg"
  },
  {
    title: "Port Credit Legion",
    venue: "Port Credit Legion",
    addr: "35 Front St N, Mississauga, ON",
    area: "Port Credit",
    start: "2026-11-13T17:30:00-05:00",
    end: "2026-11-13T20:30:00-05:00",
    tag: "With Ray Walsh on keys",
    note: "Roast beef dinner 5–7",
    poster: "assets/legion-2026-11-13.jpg"
  },
  {
    title: "House of Musical Redemption",
    venue: "ANAF",
    addr: "765 Third St, Mississauga, ON",
    area: "Mississauga",
    start: "2026-11-08T13:00:00-05:00",
    end: "2026-11-08T16:00:00-05:00"
  },
  {
    title: "The Ivy Bridge",
    venue: "The Ivy Bridge",
    addr: "160 Main St, Brampton, ON",
    area: "Brampton",
    start: "2026-11-07T19:00:00-05:00",
    end: "2026-11-07T23:00:00-05:00",
    poster: "assets/poster.jpg"
  }
];
