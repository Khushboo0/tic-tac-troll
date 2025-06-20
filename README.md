# 🎮 Tic-Tac-Troll

A mischievous twist on the classic Tic-Tac-Toe game where the AI refuses to let you win easily! This React-based game features dynamic grid sizes, intelligent AI opponent, and a cheeky "anti-win" mechanism that will keep you on your toes.

## 🎯 Features

### 🎲 Dynamic Grid Sizes
- **Flexible Gameplay**: Choose between 3x3, 4x4, or 5x5 grids
- **Adaptive UI**: Board size and styling automatically adjust to grid dimensions
- **Scalable Win Conditions**: Win by completing full rows, columns, or diagonals

### 🤖 Intelligent AI Opponent
- **Strategic Blocking**: AI prioritizes blocking your winning moves
- **Smart Positioning**: Prefers center positions and corners
- **Adaptive Difficulty**: Becomes more challenging as grid size increases

### 😈 The "Troll" Mechanism
- **Win Prevention**: AI detects when you're about to win (2 in a row + 1 empty)
- **Board Reset**: Automatically resets the game with dramatic animation
- **Taunting Popup**: Shows a cheeky "Not That Easy!" message
- **Reset Counter**: Tracks how many times the AI has "trolled" you

### 🎨 Visual Effects
- **Smooth Animations**: Pulse effects and board rotation during resets
- **Color-Coded Players**: X (Blue) vs O (Red) for clear distinction
- **Interactive Feedback**: Hover effects and position tooltips
- **Responsive Design**: Works seamlessly across different screen sizes

### 📊 Game Analytics
- **Move Tracking**: Detailed console logging of all player and AI moves
- **Position Coordinates**: User-friendly (row, col) coordinate system
- **Game Statistics**: Move count, reset count, and game state tracking
- **Strategic Analysis**: Console predictions and AI decision explanations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Khushboo0/tic-tac-troll.git
   cd tic-tac-troll
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start playing!

## 🎮 How to Play

### Basic Rules
1. **You are X**: Click on any empty square to place your X
2. **AI is O**: The AI automatically responds with its move
3. **Win Condition**: Get a complete row, column, or diagonal
4. **The Twist**: AI will reset the board if you're about to win! 😈

### Game Controls
- **Grid Size Buttons**: Switch between 3x3, 4x4, and 5x5 grids
- **Reset Game**: Manually restart the game at any time
- **Square Tooltips**: Hover over squares to see their coordinates

### Strategy Tips
- **Think Ahead**: Plan multiple moves in advance
- **Create Multiple Threats**: Force the AI into impossible situations
- **Use Larger Grids**: More space = more strategic possibilities
- **Watch the Console**: Learn from AI's decision-making process

## 🛠️ Technical Details

### Built With
- **React 18**: Modern functional components with hooks
- **Tailwind CSS**: Utility-first styling framework
- **JavaScript ES6+**: Modern JavaScript features

### Key Components
- **Dynamic Grid System**: Scalable board generation
- **AI Decision Engine**: Multi-strategy move calculation
- **Win Detection Algorithm**: Efficient pattern matching
- **Animation System**: CSS transitions and transforms

### State Management
- **Game Board**: Array-based grid representation
- **Move History**: Complete game move tracking
- **Animation States**: Smooth transition management
- **Statistics**: Real-time game analytics

## 🎯 Game Mechanics

### AI Strategy Hierarchy
1. **Block Winning Moves**: Prevent immediate player wins
2. **Seek Victory**: Take winning opportunities when available
3. **Control Center**: Occupy strategic center positions
4. **Secure Corners**: Prefer corner positions over edges
5. **Random Selection**: Fallback for remaining moves

### Troll Detection Logic
The AI monitors for these "about to win" patterns:
- **Rows**: 2 X's + 1 empty space in any row
- **Columns**: 2 X's + 1 empty space in any column
- **Diagonals**: 2 X's + 1 empty space in either diagonal

### Animation Sequence
1. **Detection**: AI identifies near-win state
2. **Brief Display**: Shows player's move for 500ms
3. **Animation**: 2-second pulse and rotation effect
4. **Reset**: Board clears to empty state
5. **Popup**: "Not That Easy!" message displays
6. **Resume**: Game continues with fresh board

## 🎨 Customization

### Styling
- **Grid Sizes**: Modify `squareSize` and `fontSize` variables
- **Colors**: Update Tailwind classes for different themes
- **Animations**: Adjust duration and effects in CSS classes

### Gameplay
- **Grid Options**: Add more size options in the `changeGridSize` function
- **AI Difficulty**: Modify strategy priorities in `getAIMove`
- **Troll Sensitivity**: Adjust detection logic in `isXAboutToWin`

### Visual Effects
- **Popup Messages**: Customize text and emojis in the popup component
- **Animation Timing**: Modify `setTimeout` delays for different pacing
- **Sound Effects**: Add audio feedback for moves and resets

## 🐛 Known Issues

- **Rapid Clicking**: Multiple clicks during AI thinking may cause issues
- **Animation Interruption**: Changing grid size during animation may cause visual glitches
- **Console Spam**: Excessive logging in development mode
- **Logic update**: AI is more focused on predicting the last move by user than winning

## 🔮 Future Enhancements

### Planned Features
- **Difficulty Levels**: Easy, Medium, Hard, and Impossible modes
- **Sound Effects**: Audio feedback for moves, wins, and trolls
- **Themes**: Dark mode and custom color schemes
- **Achievements**: Unlock badges for various accomplishments
- **Multiplayer**: Human vs Human mode option

### Technical Improvements
- **Performance**: Optimize for larger grids (6x6, 7x7)
- **Accessibility**: Enhanced keyboard navigation and screen reader support
- **Mobile**: Improved touch interactions and responsive design
- **Animations**: More sophisticated visual effects and transitions


## 🎉 Acknowledgments

- Inspired by the classic Tic-Tac-Toe game
- Built with love for puzzle game enthusiasts
- Special thanks to the React and Tailwind communities

---

**Remember**: The AI is designed to be mischievous, not impossible. With the right strategy, you CAN win! 🏆

*Happy trolling! 😈*
