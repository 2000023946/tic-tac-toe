
import copy



def get_state(player_sign):
    result_dict = {
        'X':1,
        "O":-1,
    }
    return result_dict[player_sign]

def get_result(game_board, player_sign):
    for row in game_board:
        in_row = 0
        for cell in row:
            if player_sign == cell:
                in_row += 1
        if in_row == 3:
            return get_state(player_sign)
    for c in range(len(game_board)):
        in_col = 0
        for r in range(len(game_board[0])):
            if player_sign == game_board[r][c]:
                in_col += 1
        if in_col == 3:
            return get_state(player_sign)
    #check the diagnal 1
    if player_sign == game_board[0][0] and player_sign == game_board[1][1] and player_sign == game_board[2][2]:
        return get_state(player_sign)
    #check the diag 2
    if player_sign == game_board[0][2] and player_sign == game_board[1][1] and player_sign == game_board[2][0]:
        return get_state(player_sign)
    return 0

def free_moves(game_board):
    free_moves = []
    for i in range(len(game_board)):
        for j in range(len(game_board[0])):
            if game_board[i][j] == '':
                free_moves.append((i, j))
    return free_moves
    

game_board = [['', '', ''], ['', '', ''], ['', '', '']]

#print(get_result(game_board, "O"))

class Move:
    def __init__(self, pos, sign):
        self.pos = pos
        self.sign = sign


class GameState:
    def __init__(self, game_board, move, state):
        self.game_board = game_board
        self.state = state
        self.move = move
    

def is_board_full(game_board):
    for row in game_board:
        for cell in row:
            if cell == '':
                return False
    return True

def play_min(game_board, move):#player of O
    if is_board_full(game_board) or get_result(game_board, 'O'):
        return GameState(game_board, move, get_result(game_board, 'O'))
    
    game_states = []
    copy_game_board = copy.deepcopy(game_board)
    for pos in free_moves(copy_game_board):
        copy_game_board[pos[0]][pos[1]] = 'O'
        #print(copy_game_board)
        game_states.append(play_max(copy_game_board, Move(pos, 'O')))
    min = 9999
    #look through all the game states and return the minimum game state with the move associated that was made.
    best_state = None 
    for state in game_states:
        if state.state < min:
            min = state.state
            best_state = state
    return best_state
        
        


def play_max(game_board, move):#player of X
    if is_board_full(game_board) or get_result(game_board, 'X'):
        return GameState(game_board, move, get_result(game_board, 'X'))
    
    game_states = []
    copy_game_board = copy.deepcopy(game_board)
    for pos in free_moves(copy_game_board):
        copy_game_board[pos[0]][pos[1]] = 'X'
        #print(copy_game_board)
        game_states.append(play_min(copy_game_board, Move(pos, 'X')))
    max = -9999
    #look through all the game states and return the minimum game state with the move associated that was made.
    best_state = None 
    for state in game_states:
        if state.state > max:
            max = state.state
            best_state = state
    return best_state

class Game: 
    def __init__(self, sign, game_board):
        self.sign = sign
        self.game_board = game_board
    
    def play_move(self):
        best_move = None
        if self.sign == 'O':
            best_move = play_min(self.game_board, None)
        else:
            best_move = play_max(self.game_board, None)
        return best_move


# game = Game('X', game_board)

# state = game.play_move()

# print(state.move.pos)



# print(free_moves(game_board))
# print(is_board_full(game_board))

# best_move = play_min(game_board, None)
# print(best_move.state)
# print(best_move.move.pos)

        


