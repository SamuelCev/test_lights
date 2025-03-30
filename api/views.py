from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PriceCalculatorSerializer
from .models import DivisionPrices
import math

class CalculatePriceView(APIView):
    def get(self, request):
        serializer = PriceCalculatorSerializer(data=request.GET)

        if serializer.is_valid():
            data = serializer.validated_data
            price = self.getMainPrice(data)
            
            #Verificamos solo Add-ons exclusivos a duo orders
            if data['isDuoService']:
                price *= 1.5

                if data['voiceEnabled']:
                    price *= 1.1

            #Verificamos solo Add-ons exclusivos a solo orders
            else:
                if data['streamingEnabled']:
                    price *= 1.15

                if data['isSoloOnly']:
                    price *= 1.2

                if data['championQuantity'] < 3:
                    price *= 1.1

            if data['isExpress']:
                    price *= 1.25

            price = round(price,2)
            return Response({"price" : price})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def getMainPrice(self, data):
        #Division boost
        if data['serviceType'] == 0:
            currentRank = data['currentRank']
            desiredRank = data['desiredRank']
            currentLp = data['currentLp']
            finalPrice = 0

            while desiredRank > currentRank:
                divisionData = DivisionPrices.objects.get(division=currentRank)
                pricePerWin = divisionData.price
                numberOfWins = math.ceil((100 - currentLp) / 20)
                finalPrice += pricePerWin * numberOfWins
                currentLp = 0
                currentRank += 1
            
            return finalPrice
