const dateInput = document.getElementById('date');
    const stockInput = document.getElementById('stock');
    const strategyInput = document.getElementById('strategy');
    const levelInput = document.getElementById('level');
    const amountInput = document.getElementById('amount');
    const noteInput = document.getElementById('note');
    const winInput = document.getElementById('win');
    const lossInput = document.getElementById('loss');
    const noTradeInput = document.getElementById('noTrade');
    const journalBody = document.getElementById('journalBody');
    const reportDiv = document.getElementById('report');

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
          <td>${entry.stock}</td>
          <td>${entry.strategy}</td>
          <td>${entry.level}</td>
          <td>${entry.noTrade ? '-' : entry.amount}</td>
          <td>${entry.note}</td>
          <td>${entry.win ? '✅' : ''}</td>
          <td>${entry.loss ? '❌' : ''}</td>
          <td>${entry.noTrade ? '✅' : ''}</td>
          <td><button onclick="deleteEntry(${index})" style="background:#e84118;">Delete</button></td>
        `;
        journalBody.appendChild(row);
      });
    }

    function addTrade() {
      const date = dateInput.value.trim();
      const stock = stockInput.value.trim();
      const strategy = strategyInput.value;
      const level = levelInput.value;
      const amount = parseFloat(amountInput.value);
      const note = noteInput.value.trim();
      const win = winInput.checked;
      const loss = lossInput.checked;
      const noTrade = noTradeInput.checked;

      if (!date) {
        alert("Please enter a date.");
        return;
      }

      if (!noTrade && (isNaN(amount) || !stock || !strategy || !level)) {
        alert("Please complete all trade details before saving.");
        return;
      }

      const entry = {
        date,
        stock: noTrade ? '-' : stock,
        strategy: noTrade ? '-' : strategy,
        level: noTrade ? '-' : level,
        amount: noTrade ? 0 : amount,
        note: noTrade ? 'No Trade' : note,
        win: noTrade ? false : win,
        loss: noTrade ? false : loss,
        noTrade
      };

      journal.push(entry);
      saveJournal();
      renderJournal();
      clearInputs();
    }

    function clearInputs() {
      dateInput.value = '';
      stockInput.value = '';
      strategyInput.value = '';
      levelInput.value = '';
      amountInput.value = '';
      noteInput.value = '';
      winInput.checked = false;
      lossInput.checked = false;
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
      const trades = journal.filter(t => !t.noTrade);
      const wins = trades.filter(t => t.win);
      const losses = trades.filter(t => t.loss);

      const totalProfit = trades.reduce((a, b) => a + b.amount, 0);
      const avgWin = wins.length ? (wins.reduce((a,b)=>a+b.amount,0) / wins.length) : 0;
      const avgLoss = losses.length ? (losses.reduce((a,b)=>a+b.amount,0) / losses.length) : 0;
      const winRate = (wins.length / trades.length) * 100;

      let startingBalance = parseFloat(prompt("Enter your starting balance ($):", "44.00"));
      if (isNaN(startingBalance) || startingBalance <= 0) startingBalance = 1;
      const finalBalance = startingBalance + totalProfit;

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
        <p><b>Final Balance: $${finalBalance.toFixed(2)}</b></p>
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

    // Exclusive win/loss check
    winInput.addEventListener('change', () => {
      if (winInput.checked) lossInput.checked = false;
    });
    lossInput.addEventListener('change', () => {
      if (lossInput.checked) winInput.checked = false;
    });

    // Auto-save when No Trade checked
    noTradeInput.addEventListener('change', () => {
      if (noTradeInput.checked) addTrade();
    });

    renderJournal();