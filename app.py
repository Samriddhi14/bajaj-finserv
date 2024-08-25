from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST', 'GET'])
def bfhl():
    if request.method == 'POST':
        data = request.json.get('data', [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lower_case_alphabets = [ch for ch in alphabets if ch.islower()]
        highest_lowercase = max(lower_case_alphabets) if lower_case_alphabets else None
        
        response = {
            "is_success": True,
            "user_id": "samriddhi_mishra_14",  
            "email": "samriddhi.mishra@vit.ac.in",
            "roll_number": "21BCE0586",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }
        return jsonify(response)
    
    if request.method == 'GET':
        return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)
