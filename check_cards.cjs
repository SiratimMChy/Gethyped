const https = require('https');
https.get('https://www.gethyped.nl/', (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const cssMatch = body.match(/<link href="([^"]+\.css)" rel="stylesheet"/);
    if (cssMatch) {
      https.get(cssMatch[1], (cres) => {
        let cssBody = '';
        cres.on('data', d => cssBody += d);
        cres.on('end', () => {
          const resCard = cssBody.match(/\.results-card\{[^}]+\}/g) || [];
          console.log('BASE:', resCard);
          const meds = cssBody.match(/@media[^{]+\{[^@]+}/g) || [];
          meds.forEach(m => {
            if (m.includes('results-card')) {
              console.log(m.match(/@media[^{]+\{/)[0]);
              console.log(m.match(/\.results-card[^}]+\}/g));
            }
          });
        });
      });
    }
  });
});
