 const dateInput = document.getElementById('date');
  const amountInput = document.getElementById('amount');
  const noteInput = document.getElementById('note');
  const noTradeInput = document.getElementById('noTrade');
  const reportDiv = document.getElementById('report');
  const journalBody = document.getElementById('journalBody');

  // Load saved data
  let journal = JSON.parse(localStorage.getItem('tradingJournal')) || [];

  function saveJournal() {
    localStorage.setItem('tradingJournal', JSON.stringify(journal));
  }

  function renderJournal() {
    journalBody.innerHTML = '';
    journal.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.noTrade ? '-' : entry.amount}</td>
        <td>${entry.note}</td>
        <td>${entry.noTrade ? '✅' : ''}</td>
        <td><button onclick="deleteEntry(${index})" style="background:#e84118; color:white; border:none; border-radius:5px; padding:5px 10px; cursor:pointer;">Delete</button></td>
      `;
      journalBody.appendChild(row);
    });
  }

  function addTrade() {
    const date = dateInput.value;
    const amount = parseFloat(amountInput.value);
    const note = noteInput.value.trim();
    const noTrade = noTradeInput.checked;

    if (!date) {
      alert("Please enter a date.");
      return;
    }

    if (!noTrade && isNaN(amount)) {
      alert("Enter a valid profit/loss amount or select No Trade.");
      return;
    }

    const entry = {
      date,
      amount: noTrade ? 0 : amount,
      note: noTrade ? 'No Trade' : note,
      noTrade
    };

    journal.push(entry);
    saveJournal();
    renderJournal();

    // Clear inputs
    dateInput.value = '';
    amountInput.value = '';
    noteInput.value = '';
    noTradeInput.checked = false;
  }

  function deleteEntry(index) {
    if (confirm("Are you sure you want to delete this entry?")) {
      journal.splice(index, 1); // remove that entry
      saveJournal();
      renderJournal();
    }
  }

  function generateReport() {
    if (journal.length === 0) {
      alert("No data to analyze.");
      return;
    }

    const trades = journal.filter(t => !t.noTrade);
    const wins = trades.filter(t => t.amount > 0);
    const losses = trades.filter(t => t.amount < 0);

    const totalWin = wins.reduce((a,b)=>a+b.amount,0);
    const totalLoss = losses.reduce((a,b)=>a+b.amount,0);
    const avgWin = wins.length ? (totalWin / wins.length) : 0;
    const avgLoss = losses.length ? (totalLoss / losses.length) : 0;
    const winRate = (wins.length / trades.length) * 100;
    const totalProfit = trades.reduce((a,b)=>a+b.amount,0);

    let startingBalance = parseFloat(prompt("Enter your starting balance ($):", "44.00"));
    if (isNaN(startingBalance) || startingBalance <= 0) {
      startingBalance = 1;
    }
    const growthPercent = ((startingBalance + totalProfit) - startingBalance) / startingBalance * 100;

    reportDiv.style.display = 'block';
    reportDiv.innerHTML = `
      <h3>📊 Monthly Summary</h3>
      <p>Total Trades: ${trades.length}</p>
      <p>Winning Trades: ${wins.length}</p>
      <p>Losing Trades: ${losses.length}</p>
      <p>Win Rate: ${winRate.toFixed(2)}%</p>
      <p>Average Win: $${avgWin.toFixed(2)}</p>
      <p>Average Loss: $${avgLoss.toFixed(2)}</p>
      <p>Net Profit: $${totalProfit.toFixed(2)}</p>
      <p>Growth: ${growthPercent.toFixed(2)}%</p>
    `;
  }

  function clearJournal() {
    if (confirm("Are you sure you want to clear all data?")) {
      localStorage.removeItem('tradingJournal');
      journal = [];
      renderJournal();
      reportDiv.style.display = 'none';
    }
  }

  renderJournal();