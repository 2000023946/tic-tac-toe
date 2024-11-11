
import copy



def get_state(player_sign):
    result_dict = {
        'X':1,
        "O":-1,
    }
    return result_dict[player_sign]

def get_result(game_board):
    for i, row in enumerate(game_board):
        if row[0] != '':
            if row[0] == row[1] == row[2]:
                return get_state(row[i])
    for c in range(len(game_board)):
        if game_board[0][c] != '':
            if game_board[0][c] == game_board[1][c] == game_board[2][c] :
                return get_state(game_board[0][c])
    #check the diagnal 1
    if game_board[1][1] !='':
        if game_board[0][0] == game_board[1][1] == game_board[2][2]:
            return get_state(game_board[1][1])
    #check the diag 2
        if game_board[0][2] == game_board[1][1] == game_board[2][0]:
            return get_state(game_board[1][1])
    if is_board_full(game_board):
        return 0
    return None

def free_moves(game_board):
    free_moves = []
    for i in range(len(game_board)):
        for j in range(len(game_board[0])):
            if game_board[i][j] == '':
                free_moves.append((i, j))
    return free_moves
    

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

def play_min(game_board):#player of O
    result = get_result(game_board)
    if is_board_full(game_board) or result:
        return GameState(game_board, None, result)
    
    best_state = None
    min = 999
    copy_game_board = copy.deepcopy(game_board)
    for pos in free_moves(copy_game_board):
        copy_game_board[pos[0]][pos[1]] = 'O'
        # print(copy_game_board, 'o')
        move = Move(pos, 'O')
        state = play_max(copy_game_board)
        state.move = move
        print(state.game_board, state.move.pos, state.move.sign, state.state, 'o')
        copy_game_board[pos[0]][pos[1]] = ''
        # if state.state == -1:
        #     print('out')
        #     return state
        if state.state < min:
            print('in')
            min = state.state
            best_state = state
    #look through all the game states and return the minimum game state with the move associated that was made.
    #print(best_state.move.pos, 'o')
    return best_state
        
        


def play_max(game_board):#player of X
    result = get_result(game_board)
    if is_board_full(game_board) or result:
        return GameState(game_board, None, result)
    
    max = -999
    #look through all the game states and return the minimum game state with the move associated that was made.
    best_state = None
    print('round1')
    
    copy_game_board = copy.deepcopy(game_board)
    for pos in free_moves(copy_game_board):
        copy_game_board[pos[0]][pos[1]] = 'X'
        # print(copy_game_board, 'x')
        move = Move(pos, 'X')
        state = play_min(copy_game_board)
        state.move = move
        print(state.game_board, state.move.pos, state.move.sign, state.state, 'x')
        copy_game_board[pos[0]][pos[1]] = ''
        # if state.state == 1:
        #     print('out')
        #     return state
        if state.state > max:
            print('in')
            max = state.state
            best_state = state
    return best_state

class Game: 
    def __init__(self, game_board):
        self.game_board = game_board
    
    def play_move(self):
        best_move = None
        sign = self.__get_sign()
        print(sign)
        if sign == 'O':
            best_move = play_min(self.game_board)
        else:
            best_move = play_max(self.game_board)
        return best_move

    def __get_sign(self):
        count_x = 0
        count_o = 0
        for row in self.game_board:
            for cell in row:
                if cell == 'X':
                    count_x+=1
                elif cell == 'O':
                    count_o +=1
        if count_o < count_x:
            return 'O'
        return 'X'
    
game_board = [['X', 'O', ''], ['', '', ''], ['', '', '']]

# print(get_result(game_board))

# print(get_result(game_board))




game = Game(game_board)

state = game.play_move()

print(state.state)

# print(state.state)


# print(state.move.pos)

# print(state.move.sign)




# print(free_moves(game_board))
# print(is_board_full(game_board))

# best_move = play_min(game_board, None)
# print(best_move.state)
# print(best_move.move.pos)

        


