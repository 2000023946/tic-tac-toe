from channels.generic.websocket import AsyncWebsocketConsumer # type: ignore
import json 

from .algo import Game

class MyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        await self.send(text_data=json.dumps({
            'status':'success',
            'message':'Welcome to server!'
        }))

    async def receive(self, text_data):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        data = json.loads(text_data)
        print(data)
        if data['isYourTurn']:
            game = Game(data['sign'], data['gameBoard'])
            state = game.play_move()
            best_move = state.move.pos
            print(best_move)
            data['gameBoard'][best_move[0]][best_move[1]] = data['sign']
            print(data['gameBoard'])
            await self.send(text_data=json.dumps({
                'status':'move',
                'move': best_move,
                'sign': data['sign'],
                'gameBoard':data['gameBoard']
            }))

    async def disconnect(self, code):
        self.close()