const raw = `Hit Points: 55
Damage: 8`

const prepareInput = (rawInput: string) => {
  const [hp, damage] = rawInput.match(/\d+/g).map(Number)

  return { hp, damage }
}

const spells = {
  missile: { cost: 53, damage: 4, armor: 0, lasts: 0, hp: 0, mana: 0 },
  drain: { cost: 73, damage: 2, armor: 0, lasts: 0, hp: 2, mana: 0 },
  shield: { cost: 113, damage: 0, armor: 7, lasts: 6, hp: 0, mana: 0 },
  poison: { cost: 173, damage: 3, armor: 0, lasts: 6, hp: 0, mana: 0 },
  recharge: { cost: 229, damage: 0, armor: 0, lasts: 5, hp: 0, mana: 101 },
}

const go = (player, boss, bossHandicap = 0) => {
  let minCost = Infinity

  const recur = (mana, playerHP, bossHP, cost, shield, poison, recharge) => {
    playerHP -= bossHandicap

    if (playerHP <= 0) {
      return
    }

    const allowed = ["missile"]

    if (mana >= spells.drain.cost) allowed.push("drain")
    if (shield <= 1 && mana >= spells.shield.cost) allowed.push("shield")
    if (poison <= 1 && mana >= spells.poison.cost) allowed.push("poison")
    if (recharge === 0 && mana >= spells.recharge.cost) allowed.push("recharge")

    let damage = 0
    let armor = 0

    if (shield > 1) {
      armor = 7
    }

    if (poison !== 0) {
      damage += 3 * Math.min(poison, 2)
    }

    if (recharge !== 0) {
      mana += 101 * Math.min(recharge, 2)
    }

    poison = Math.max(poison - 2, 0)
    shield = Math.max(shield - 2, 0)
    recharge = Math.max(recharge - 2, 0)

    allowed.forEach((spell) => {
      const nextMana = mana + spells[spell].mana - spells[spell].cost
      const nextCost = cost + spells[spell].cost
      const nextShield = spell === "shield" ? spells.shield.lasts - 1 : shield
      const nextPoison = spell === "poison" ? spells.poison.lasts - 1 : poison
      const nextRecharge =
        spell === "recharge" ? spells.recharge.lasts - 1 : recharge

      const nextDamage =
        spell === "missile"
          ? damage + 4
          : spell === "drain"
          ? damage + 2
          : spell === "poison"
          ? damage + 3
          : damage

      const nextArmor = spell === "shield" ? 7 : armor

      const nextBossHP = bossHP - nextDamage
      const nextPlayerHP =
        playerHP + spells[spell].hp - Math.max(boss.damage - nextArmor, 1)

      if (nextBossHP <= 0) {
        minCost = Math.min(minCost, nextCost)
        return
      }

      if (nextPlayerHP <= 0 || nextMana < 53 || nextCost + 53 > minCost) {
        return
      }

      recur(
        nextMana,
        nextPlayerHP,
        nextBossHP,
        nextCost,
        nextShield,
        nextPoison,
        nextRecharge,
      )
    })
  }

  recur(player.mana, player.hp, boss.hp, 0, 0, 0, 0)

  return minCost
}

export default () => {
  const player = { hp: 50, mana: 500 }
  const boss = prepareInput(raw)

  go(player, boss)
  go(player, boss, 1)
}
