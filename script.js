const currentRankSelect = document.getElementById("currentRank");
const targetRankSelect = document.getElementById("targetRank");

const originalTargetOptions = Array.from(targetRankSelect.options);

function updateTargetRanks() {
  const currentValue = Number(currentRankSelect.value);

  targetRankSelect.innerHTML = "";

  let firstValidOption = null;

  originalTargetOptions.forEach(option => {
    if (Number(option.value) > currentValue) {
      const newOption = option.cloneNode(true);
      if (!firstValidOption) {
        firstValidOption = newOption;
      }
      targetRankSelect.appendChild(newOption);
    }
  });

  if (!firstValidOption) {
    const opt = document.createElement("option");
    opt.text = "No higher rank available";
    opt.disabled = true;
    opt.selected = true;
    targetRankSelect.appendChild(opt);
  } else {
    firstValidOption.selected = true; // 🔥 AUTO-SELECT NEXT RANK
  }
}

currentRankSelect.addEventListener("change", updateTargetRanks);
updateTargetRanks();

function calculate() {
  const current = Number(currentRankSelect.value);
  const target = Number(targetRankSelect.value);
  const winRate = Number(document.getElementById("winRate").value);

  if (winRate <= 0 || winRate > 100) {
    document.getElementById("result").innerText =
      "Please enter a valid win rate.";
    return;
  }

  const starsNeeded = target - current;
  const estimatedMatches = Math.ceil(starsNeeded / (winRate / 100));
  const winsNeeded = starsNeeded;
  const lossesAllowed = Math.floor(winsNeeded * (1 - winRate / 100));

  document.getElementById("result").innerHTML = `
    <p><strong>Estimated Matches:</strong> ${estimatedMatches}</p>
    <p><strong>Wins Needed:</strong> ${winsNeeded}</p>
    <p><strong>Possible Losses:</strong> ${lossesAllowed}</p>
    <p style="margin-top:10px;color:#00ffff;">
      Tip: Ranking up is faster with duo/squad play.
    </p>
  `;
}
