/* Builds the show listings from window.CFB_SHOWS (see shows.js). No need to edit this file to add shows. */
(function () {
  var TZ = 'America/Toronto';
  var SITE = 'https://crossfieldbend.com';

  function all() {
    return (window.CFB_SHOWS || []).map(function (s) {
      var o = {}; for (var k in s) o[k] = s[k];
      o.s = new Date(s.start);
      o.noEnd = !s.end;  /* no set end time: keep it listed for 4 hours after the start */
      o.e = s.end ? new Date(s.end) : new Date(o.s.getTime() + 4 * 3600 * 1000);
      return o;
    }).filter(function (s) { return !isNaN(s.s) && !isNaN(s.e); });
  }
  function upcoming(now) {
    return all().filter(function (s) { return s.e > now; }).sort(function (a, b) { return a.s - b.s; });
  }
  function past(now) {
    return all().filter(function (s) { return s.e <= now; }).sort(function (a, b) { return b.s - a.s; });
  }
  function part(d, opts) { return new Intl.DateTimeFormat('en-CA', Object.assign({ timeZone: TZ }, opts)).format(d).replace(/\./g, ''); }
  function wd(d) { return part(d, { weekday: 'short' }); }
  function md(d) { return part(d, { month: 'short' }) + ' ' + part(d, { day: 'numeric' }); }
  function hm(d) {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true }).formatToParts(d);
    var h = '', m = '', ap = '';
    p.forEach(function (x) { if (x.type === 'hour') h = x.value; if (x.type === 'minute') m = x.value; if (x.type === 'dayPeriod') ap = x.value.toUpperCase(); });
    return { h: h, t: m === '00' ? h : h + ':' + m, ap: ap };
  }
  function timeRange(s) {
    var a = hm(s.s), b = hm(s.e);
    if (s.noEnd) return a.t + ' ' + a.ap;
    return a.ap === b.ap ? a.t + '–' + b.t + ' ' + b.ap : a.t + ' ' + a.ap + '–' + b.t + ' ' + b.ap;
  }
  function street(s) { return s.addr.split(',')[0].trim(); }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function label(s) { return s.title === s.venue ? s.venue : s.venue + ' · ' + s.title; }
  function eventName(s) { return s.title === s.venue ? 'Crossfield Bend at ' + s.venue : 'Crossfield Bend: ' + s.title; }

  /* US-highway style route shield: start time big, end time small */
  function routeHTML(s) {
    var a = hm(s.s), b = hm(s.e), big = a.t, size = big.length > 2 ? 27 : 40;
    return '<svg class="route" viewBox="0 0 100 112" role="img" aria-label="Starts ' + esc(a.t + ' ' + a.ap) + (s.noEnd ? '' : ', ends ' + esc(b.t + ' ' + b.ap)) + '">' +
      '<path d="M6 4 H94 C93 12 95 18 98 22 C98 64 80 90 50 108 C20 90 2 64 2 22 C5 18 7 12 6 4 Z" fill="#fcf5e3" stroke="#2b1d14" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M12 10 H88 C87.6 15 88.6 19 91 23 C91 61 75 84 50 99 C25 84 9 61 9 23 C11.4 19 12.4 15 12 10 Z" fill="none" stroke="#2b1d14" stroke-width="1.6"/>' +
      '<path d="M12 10 H88 C87.6 15 88.6 19 91 23 H9 C11.4 19 12.4 15 12 10 Z" fill="#2b1d14"/>' +
      '<text x="50" y="19.6" text-anchor="middle" font-family="Overpass,sans-serif" font-weight="900" font-size="9" letter-spacing="1.6" fill="#fcf5e3">STARTS</text>' +
      '<text x="50" y="' + (size > 30 ? 54 : 50) + '" text-anchor="middle" font-family="Overpass,sans-serif" font-weight="900" font-size="' + size + '" fill="#2b1d14">' + esc(big) + '</text>' +
      '<text x="50" y="64" text-anchor="middle" font-family="Overpass,sans-serif" font-weight="900" font-size="10" letter-spacing="1" fill="#2b1d14">' + esc(a.ap) + '</text>' +
      (s.noEnd ? '' : '<path d="M26 69 H74" stroke="#2b1d14" stroke-width="1.6"/>' +
      '<text x="50" y="79" text-anchor="middle" font-family="Overpass,sans-serif" font-weight="800" font-size="' + (b.t.length > 2 ? 6.6 : 7.6) + '" letter-spacing=".3" fill="#2b1d14">TIL ' + esc(b.t + ' ' + b.ap) + '</text>') +
      '</svg>';
  }

  function rowHTML(s) {
    return '<div class="show">' +
      '<div class="date">' + esc(wd(s.s)) + ' · ' + esc(md(s.s)) + '</div>' +
      '<div class="where"><div class="v">' + esc(label(s)) + (s.tag ? ' <span class="tagchip">' + esc(s.tag) + '</span>' : '') + '</div>' +
      '<div class="c">' + esc(s.addr) + (s.area && s.addr.indexOf(s.area) < 0 ? ' · ' + esc(s.area) : '') + '</div>' +
      (s.note ? '<div class="c note">' + esc(s.note) + '</div>' : '') +
      (window.CFB.actionsHTML ? window.CFB.actionsHTML(s) : '') + '</div>' +
      routeHTML(s) +
      '</div>';
  }

  function jsonld(now) {
    var data = upcoming(now).map(function (s) {
      var bits = s.addr.split(',').map(function (x) { return x.trim(); });
      var ev = {
        '@context': 'https://schema.org', '@type': 'MusicEvent', name: eventName(s),
        startDate: s.start,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: s.venue, address: { '@type': 'PostalAddress', streetAddress: bits[0], addressLocality: bits[1] || '', addressRegion: bits[2] || 'ON', addressCountry: 'CA' } },
        performer: { '@type': 'MusicGroup', name: 'Crossfield Bend', url: SITE + '/' },
        url: SITE + '/#shows',
        description: 'Crossfield Bend live at ' + s.venue + ', ' + s.area + '.'
      };
      if (s.end) ev.endDate = s.end;
      if (s.poster) ev.image = SITE + '/' + s.poster;
      return ev;
    });
    var old = document.getElementById('cfb-events'); if (old) old.remove();
    if (!data.length) return;
    var tag = document.createElement('script');
    tag.type = 'application/ld+json'; tag.id = 'cfb-events';
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  }

  function renderHome(now) {
    now = now || new Date();
    var up = upcoming(now), list = document.getElementById('show-list');
    if (list) list.innerHTML = up.map(rowHTML).join('');
    var wrap = document.getElementById('nextwrap');
    if (wrap) {
      if (!up.length) { wrap.style.display = 'none'; }
      else {
        var n = up[0];
        wrap.style.display = '';
        document.getElementById('ns-date').textContent = wd(n.s) + ' ' + md(n.s);
        document.getElementById('ns-time').textContent = timeRange(n);
        document.getElementById('ns-venue').textContent = n.venue;
        document.getElementById('ns-addr').textContent = street(n) + ' · ' + n.area;
        var note = document.getElementById('ns-note');
        if (note) { note.textContent = n.note || ''; note.style.display = n.note ? '' : 'none'; }
        var poster = document.getElementById('ns-poster');
        if (n.poster) { poster.src = n.poster; poster.alt = label(n) + ', ' + wd(n.s) + ' ' + md(n.s); poster.style.display = ''; }
        else { poster.style.display = 'none'; }
        var acts = document.getElementById('ns-actions');
        if (acts && window.CFB.actionsHTML) acts.innerHTML = window.CFB.actionsHTML(n);
      }
    }
    var empty = document.getElementById('show-empty');
    if (empty) empty.style.display = up.length ? 'none' : '';
    var recent = document.getElementById('show-recent'), p = past(now).slice(0, 4);
    if (recent) {
      recent.style.display = p.length ? '' : 'none';
      recent.innerHTML = p.length ? '<span class="pl-label">Recent shows</span>' + p.map(function (s) { return esc(wd(s.s) + ' ' + md(s.s)) + ' · ' + esc(label(s)); }).join(' &nbsp;/&nbsp; ') : '';
    }
    jsonld(now);
  }

  function renderEpk(now) {
    now = now || new Date();
    var box = document.getElementById('epk-shows'); if (!box) return;
    var up = upcoming(now);
    box.innerHTML = up.length ? up.map(function (s) {
      return '<div class="row"><div class="d">' + esc(wd(s.s) + ' · ' + md(s.s)) + '</div><div class="w"><b>' + esc(label(s)) + '</b><br><span>' +
        esc(s.addr) + (s.area && s.addr.indexOf(s.area) < 0 ? ' · ' + esc(s.area) : '') + ' · ' + esc(timeRange(s)) + '</span>' +
        (s.note ? '<br><span>' + esc(s.note) + '</span>' : '') + '</div></div>';
    }).join('') : '<div class="row"><div class="w"><span>New dates coming soon.</span></div></div>';
  }


  /* Fan actions: Google Maps directions and an .ics calendar file */
  function icsStamp(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  function icsEsc(t) { return String(t).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1'); }
  function icsHref(s) {
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Crossfield Bend//Shows//EN', 'BEGIN:VEVENT',
      'UID:' + icsStamp(s.s) + '-' + s.venue.replace(/[^A-Za-z0-9]/g, '') + '@crossfieldbend.com',
      'DTSTAMP:' + icsStamp(new Date()), 'DTSTART:' + icsStamp(s.s), 'DTEND:' + icsStamp(s.e),
      'SUMMARY:' + icsEsc(eventName(s)), 'LOCATION:' + icsEsc(s.venue + ', ' + s.addr),
      'URL:' + SITE + '/#shows', 'END:VEVENT', 'END:VCALENDAR'];
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
  }
  function mapsHref(s) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.venue + ', ' + s.addr); }
  function actionsHTML(s) {
    var day = s.start.slice(0, 10);
    return '<div class="acts">' +
      '<a class="btn ghost sm" href="' + mapsHref(s) + '" target="_blank" rel="noopener">Directions</a>' +
      '<a class="btn ghost sm" href="' + icsHref(s) + '" download="crossfield-bend-' + day + '.ics">Add to calendar</a>' +
      '</div>';
  }

  window.CFB = Object.assign(window.CFB || {}, {
    upcoming: upcoming, past: past, timeRange: timeRange, label: label, eventName: eventName,
    wd: wd, md: md, esc: esc, actionsHTML: actionsHTML, icsHref: icsHref, mapsHref: mapsHref, renderHome: renderHome, renderEpk: renderEpk, jsonld: jsonld
  });
})();
