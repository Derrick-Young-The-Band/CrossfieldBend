/* Builds the show listings from window.CFB_SHOWS (see shows.js). No need to edit this file to add shows. */
(function () {
  var TZ = 'America/Toronto';
  var SITE = 'https://crossfieldbend.com';

  function all() {
    return (window.CFB_SHOWS || []).map(function (s) {
      var o = {}; for (var k in s) o[k] = s[k];
      o.s = new Date(s.start); o.e = new Date(s.end);
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
    return a.ap === b.ap ? a.t + '–' + b.t + ' ' + b.ap : a.t + ' ' + a.ap + '–' + b.t + ' ' + b.ap;
  }
  function street(s) { return s.addr.split(',')[0].trim(); }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function label(s) { return s.title === s.venue ? s.venue : s.venue + ' · ' + s.title; }
  function eventName(s) { return s.title === s.venue ? 'Crossfield Bend at ' + s.venue : 'Crossfield Bend: ' + s.title; }

  function rowHTML(s) {
    var a = hm(s.s), b = hm(s.e);
    return '<div class="show">' +
      '<div class="date">' + esc(wd(s.s)) + ' · ' + esc(md(s.s)) + '</div>' +
      '<div class="where"><div class="v">' + esc(label(s)) + (s.tag ? ' <span class="tagchip">' + esc(s.tag) + '</span>' : '') + '</div>' +
      '<div class="c">' + esc(s.addr) + (s.area && s.addr.indexOf(s.area) < 0 ? ' · ' + esc(s.area) : '') + '</div>' +
      (window.CFB.actionsHTML ? window.CFB.actionsHTML(s) : '') + '</div>' +
      '<div class="limit" aria-label="' + esc(timeRange(s)) + '"><span class="mx">Maximum</span><span class="n">' + esc(b.t) + '</span><span class="u">' + esc(b.ap) + '</span><span class="fr">From ' + esc(a.t + ' ' + a.ap) + '</span></div>' +
      '</div>';
  }

  function jsonld(now) {
    var data = upcoming(now).map(function (s) {
      var bits = s.addr.split(',').map(function (x) { return x.trim(); });
      var ev = {
        '@context': 'https://schema.org', '@type': 'MusicEvent', name: eventName(s),
        startDate: s.start, endDate: s.end,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: s.venue, address: { '@type': 'PostalAddress', streetAddress: bits[0], addressLocality: bits[1] || '', addressRegion: bits[2] || 'ON', addressCountry: 'CA' } },
        performer: { '@type': 'MusicGroup', name: 'Crossfield Bend', url: SITE + '/' },
        url: SITE + '/#shows',
        description: 'Crossfield Bend live at ' + s.venue + ', ' + s.area + '.'
      };
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
        esc(s.addr) + (s.area && s.addr.indexOf(s.area) < 0 ? ' · ' + esc(s.area) : '') + ' · ' + esc(timeRange(s)) + '</span></div></div>';
    }).join('') : '<div class="row"><div class="w"><span>New dates coming soon.</span></div></div>';
  }

  window.CFB = Object.assign(window.CFB || {}, {
    upcoming: upcoming, past: past, timeRange: timeRange, label: label, eventName: eventName,
    wd: wd, md: md, esc: esc, renderHome: renderHome, renderEpk: renderEpk, jsonld: jsonld
  });
})();
