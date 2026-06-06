
const data = window.NORWAY_DATA;
const img = name => `assets/img/${name}`;
const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  children.forEach(child => node.append(child));
  return node;
};
const linkRow = links => {
  const row = el('div', {class:'linkRow'});
  (links || []).forEach(l => row.append(el('a', {href:l.url, target:'_blank', rel:'noopener'}, [l.label])));
  return row;
};

function renderRoute() {
  const route = ['Toronto','Oslo','Flåm/Aurland','Bergen','Ålesund','Geiranger','Olden/Loen','Hardangerfjord','Stavanger','Trondheim','Bodø','Lofoten','Tromsø','Toronto'];
  const wrap = document.getElementById('routeRibbon');
  route.forEach((r, i) => wrap.append(el('span', {}, [i < route.length - 1 ? `${r} →` : r])));
}

function dayMatchesFilter(day, filter) {
  const text = `${day.title} ${day.movement} ${day.base} ${day.plan.join(' ')} ${day.decision}`.toLowerCase();
  if (filter === 'drive') return text.includes('drive') || text.includes('rental car') || text.includes('ferry');
  if (filter === 'hotel') return ['Oslo','Flåm/Aurland','Bergen','Ålesund','Geiranger','Olden/Loen','Hardangerfjord','Stavanger','Trondheim','Bodø','Lofoten','Tromsø'].includes(day.base);
  if (filter === 'activity') return text.includes('kayak') || text.includes('aurora') || text.includes('preikestolen') || text.includes('skylift') || text.includes('glacier') || text.includes('waterfall');
  return true;
}

function renderDays() {
  const container = document.getElementById('dayCards');
  const searchBox = document.getElementById('searchBox');
  const chips = document.querySelectorAll('.chip');
  let active = 'all';

  function draw() {
    const q = searchBox.value.trim().toLowerCase();
    container.innerHTML = '';
    data.days.filter(day => dayMatchesFilter(day, active)).filter(day => {
      if (!q) return true;
      return JSON.stringify(day).toLowerCase().includes(q);
    }).forEach(day => {
      const card = el('article', {class:'dayCard'});
      const photos = el('div', {class:'photos'});
      day.images.slice(0, 3).forEach((name, idx) => photos.append(el('img', {src:img(name), alt:`${day.base} image ${idx+1}`, loading:'lazy'})));
      const content = el('div', {class:'dayContent'});
      content.append(el('div', {class:'dayTop'}, [
        el('div', {}, [el('div',{class:'meta'}, [`${day.date} • Sleep: ${day.sleep}`]), el('h3', {}, [`Day ${day.day}: ${day.title}`])]),
        el('span', {class:'badge'}, [day.pace])
      ]));
      content.append(el('p', {class:'meta'}, [day.movement]));
      const ul = el('ul');
      day.plan.forEach(p => ul.append(el('li', {}, [p])));
      content.append(ul);
      content.append(el('p', {class:'decision', html:`<strong>Decision:</strong> ${day.decision}`}));
      content.append(linkRow(day.links));
      card.append(photos, content);
      container.append(card);
    });
  }
  searchBox.addEventListener('input', draw);
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    active = chip.dataset.filter;
    draw();
  }));
  draw();
}

function renderHotels() {
  const container = document.getElementById('hotelCards');
  data.hotels.forEach(h => {
    const card = el('article', {class:'hotelCard'});
    card.append(el('img', {src:img(h.image), alt:h.imageLabel, loading:'lazy'}));
    const content = el('div', {class:'hotelContent'});
    content.append(el('p', {class:'eyebrow'}, [h.dates]));
    content.append(el('h3', {}, [h.stop]));
    content.append(el('p', {class:'fit'}, [h.fit]));
    content.append(el('p', {class:'caption'}, [`Photo/context: ${h.imageLabel}`]));
    h.candidates.forEach(c => {
      const candidate = el('div', {class:'candidate'});
      candidate.append(el('strong', {}, [c.name]));
      candidate.append(linkRow(c.links));
      content.append(candidate);
    });
    content.append(el('div', {class:'checks'}, ['Review together: recent traveler photos, breakfast, parking/transit, luggage logistics, and whether the location is worth paying extra for.']));
    card.append(content);
    container.append(card);
  });
}

function renderDrives() {
  const container = document.getElementById('driveCards');
  data.routeStops.forEach(r => {
    const card = el('article', {class:'driveCard'});
    card.append(el('img', {src:img(r.image), alt:r.route, loading:'lazy'}));
    const content = el('div', {class:'driveContent'});
    content.append(el('h3', {}, [r.route]));
    content.append(el('p', {class:'cardText'}, [r.core]));
    content.append(linkRow(r.links));
    card.append(content);
    container.append(card);
  });
}

function renderTransport() {
  const container = document.getElementById('transportCards');
  data.transport.forEach(t => {
    const card = el('article', {class:'transportCard'});
    card.append(el('h3', {}, [t.mode]));
    card.append(el('p', {class:'cardText'}, [t.detail]));
    card.append(linkRow(t.links));
    container.append(card);
  });
}

function renderBooking() {
  const body = document.querySelector('#bookingTable tbody');
  data.booking.forEach(row => {
    const tr = el('tr');
    row.forEach(cell => tr.append(el('td', {}, [cell])));
    body.append(tr);
  });
}

function renderCredits() {
  const list = document.getElementById('creditList');
  data.imageCredits.forEach(c => list.append(el('li', {}, [c])));
}

renderRoute();
renderDays();
renderHotels();
renderDrives();
renderTransport();
renderBooking();
renderCredits();
