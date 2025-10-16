 const dateInput = document.getElementById('date');
    const stockInput = document.getElementById('stock');
    const strategyType = document.getElementById('strategyType');
    const amountInput = document.getElementById('amount');
    const noteInput = document.getElementById('note');
    const noTradeInput = document.getElementById('noTrade');
    const reportDiv = document.getElementById('report');
    const journalBody = document.getElementById('journalBody');

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
          <td>${entry.stock || '-'}</td>
          <td>${entry.strategy || '-'}</td>
          <td>${entry.noTrade ? '-' : entry.amount}</td>
          <td>${entry.note}</td>
          <td>${entry.noTrade ? '✅' : ''}</td>
          <td><button style="background:#e84118;" onclick="deleteEntry(${index})">Delete</button></td>
        `;
        journalBody.appendChild(row);
      });
    }

    function addTrade() {
      const date = dateInput.value.trim();
      const stock = stockInput.value.trim();
      const strategy = strategyType.value;
      const amount = parseFloat(amountInput.value);
      const note = noteInput.value.trim();
      const noTrade = noTradeInput.checked;

      if (!date) {
        alert("Please enter a date.");
        return;
      }

      if (!noTrade && (!stock || !strategy)) {
        alert("Please fill in Stock Name and Strategy Type (High/Low).");
        return;
      }

      if (!noTrade && isNaN(amount)) {
        alert("Please enter a valid Profit/Loss amount or select No Trade.");
        return;
      }

      const entry = {
        date,
        stock: noTrade ? '-' : stock,
        strategy: noTrade ? '-' : strategy,
        amount: noTrade ? 0 : amount,
        note: noTrade ? 'No Trade' : note,
        noTrade
      };

      journal.push(entry);
      saveJournal();
      renderJournal();

      // Clear fields
      dateInput.value = '';
      stockInput.value = '';
      strategyType.value = '';
      amountInput.value = '';
      noteInput.value = '';
      noTradeInput.checked = false;
    }

    function deleteEntry(index) {
      if (confirm("Are you sure you want to delete this entry?")) {
        journal.splice(index, 1);
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
      const avgWin = wins.length ? totalWin / wins.length : 0;
      const avgLoss = losses.length ? totalLoss / losses.length : 0;
      const winRate = trades.length ? (wins.length / trades.length * 100) : 0;
      const totalProfit = trades.reduce((a,b)=>a+b.amount,0);

      let startBal = parseFloat(prompt("Enter your starting balance ($):", "44.00"));
      if (isNaN(startBal) || startBal <= 0) startBal = 1;
      const growth = ((startBal + totalProfit) - startBal) / startBal * 100;

      // Strategy breakdown
      const highTrades = trades.filter(t => t.strategy === 'High Break');
      const lowTrades = trades.filter(t => t.strategy === 'Low Break');

      const highWins = highTrades.filter(t => t.amount > 0).length;
      const lowWins = lowTrades.filter(t => t.amount > 0).length;

      const highWinRate = highTrades.length ? (highWins / highTrades.length * 100) : 0;
      const lowWinRate = lowTrades.length ? (lowWins / lowTrades.length * 100) : 0;

      reportDiv.style.display = 'block';
      reportDiv.innerHTML = `
        <h3>📈 Monthly Summary</h3>
        <p><b>Total Trades:</b> ${trades.length}</p>
        <p><b>Winning Trades:</b> ${wins.length}</p>
        <p><b>Losing Trades:</b> ${losses.length}</p>
        <p><b>Win Rate:</b> ${winRate.toFixed(2)}%</p>
        <p><b>Average Win:</b> $${avgWin.toFixed(2)}</p>
        <p><b>Average Loss:</b> $${avgLoss.toFixed(2)}</p>
        <p><b>Net Profit:</b> $${totalProfit.toFixed(2)}</p>
        <p><b>Growth:</b> ${growth.toFixed(2)}%</p>
        <hr>
        <h4>⚔ Win Rate by Strategy</h4>
        <p>High Break Win Rate: ${highWinRate.toFixed(2)}%</p>
        <p>Low Break Win Rate: ${lowWinRate.toFixed(2)}%</p>
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