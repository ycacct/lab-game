// Global | Constants
const winningArrays = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
]
const columnMapping = [
  [0, 7, 14, 21, 28, 35],
  [1, 8, 15, 22, 29, 36],
  [2, 9, 16, 23, 30, 37],
  [3, 10, 17, 24, 31, 38],
  [4, 11, 18, 25, 32, 39],
  [5, 12, 19, 26, 33, 40],
  [6, 13, 20, 27, 34, 41]
]

// Global | Elements
const $message = $('#message')
const $reset = $('#reset')
const $slots = $('.slot')

// Global | Variables
let winner = null
let turn = 'Y'
let grid = [
  '','','','','','','',
  '','','','','','','',
  '','','','','','','',
  '','','','','','','',
  '','','','','','','',
  '','','','','','',''
]

// EventListeners | Reset Click
$reset.on('click', () => {
  // Winner Related
  winner = null

  // Turn Related
  turn = 'Y'
  $message.text('Yellow\'s Turn')

  // Slot Related
  grid = [
    '','','','','','','',
    '','','','','','','',
    '','','','','','','',
    '','','','','','','',
    '','','','','','','',
    '','','','','','',''
  ]
  $slots.css('background-color', 'white')
  $slots.removeClass('yellow red')
})

const checkWinner = function () {
  for (let i = 0; i < winningArrays.length; i ++) {
    const grid1 = grid[winningArrays[i][0]];
    const grid2 = grid[winningArrays[i][1]];
    const grid3 = grid[winningArrays[i][2]];
    const grid4 = grid[winningArrays[i][3]];

    if (grid1 && grid1 === grid2 && grid1 === grid3 && grid1 === grid4) {
      return true
    }
  }

  return false
};

// EventListeners | Slot Click
$slots.on('click', (e) => {
  if (winner) {
    alert('Please Reset Game!')
  } else {
    const $slot = $(e.target)
    const columnIndex = $slot.attr('data-column')

    for (let i = columnMapping[columnIndex].length - 1; i >= 0; i--) {
      const gridIndex = columnMapping[columnIndex][i]

      if (grid[gridIndex]) {
        // Column is Taken
        // If all columns is taken, then alert
        if (i === 0) alert('all columns taken')
      } else {
        // Column is available
        // Change that slot's background color
        // Keep the record in the grid
        $(`.slot[data-index="${gridIndex}"]`).css('background-color', turn === 'Y' ? 'yellow' : 'red')
        // $(`.slot[data-index="${gridIndex}"]`).addClass(turn === 'Y' ? 'yellow' : 'red')
        grid[gridIndex] = turn;

        // check if winningArrays is true
        // something to do with turn? since it's where the record is stored?
        // match red or yellow result with winningArrays
        // loop winningArray
        //   given each combination check if the corresponding grid value
        //   is all equal and not blank
        if (checkWinner()) {
          winner = turn
          $message.text(`Winner is ${turn === 'Y' ? 'Yellow' : 'Red'}`)
          alert(`Winner is ${turn === 'Y' ? 'Yellow' : 'Red'}`)
        } else {
          // Change Turn if no winner
          turn = turn === 'Y' ? 'R' : 'Y'
          $message.text(turn === 'Y' ? 'Yellow\'s Turn' : 'Red\'s Turn')
        }

        break // If a slot is filled. Stop check other slots
      }
    }
  }
})
