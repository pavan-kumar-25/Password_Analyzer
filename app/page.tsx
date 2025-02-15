"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, ShieldCheck, Eye, EyeOff, RefreshCw, Lightbulb } from "lucide-react";
import zxcvbn from "zxcvbn";

const PasswordAnalyzer = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [metCriteria, setMetCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    analyzePassword(password);
  }, [password]);

  const generateStrongPassword = () => {
    const length = 16;
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    const allChars = uppercase + lowercase + numbers + special;
    let password = "";

    // Ensure at least one of each type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(password);
  };

  const generateRecommendations = (pass: string) => {
    if (!pass) return [];

    const recommendations: string[] = [];
    const baseWord = pass.toLowerCase();

    // Suggest variations based on the current password
    if (pass.length > 0) {
      // Add special characters
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
        recommendations.push(baseWord + "@123!");
        recommendations.push("!" + baseWord + "#");
      }

      // Add numbers if missing
      if (!/\d/.test(pass)) {
        recommendations.push(baseWord + "2024");
        recommendations.push(baseWord + "123");
      }

      // Capitalize if all lowercase
      if (!/[A-Z]/.test(pass)) {
        recommendations.push(baseWord.charAt(0).toUpperCase() + baseWord.slice(1) + "!");
      }

      // Add length if too short
      if (pass.length < 10) {
        recommendations.push(pass + "Secure2024!");
      }

      // Suggest pattern modifications
      if (/^[A-Za-z]+$/.test(pass)) {
        recommendations.push(pass + "@2024");
      }
    }

    return recommendations.slice(0, 3); // Limit to 3 recommendations
  };

  const analyzePassword = (pass: string) => {
    const analysis = zxcvbn(pass);
    
    const criteria = {
      length: pass.length >= 10,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /\d/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };
    setMetCriteria(criteria);

    let baseStrength = (analysis.score / 4) * 100;
    const criteriaCount = Object.values(criteria).filter(Boolean).length;
    const adjustedStrength = Math.min(baseStrength, (criteriaCount / 5) * 100);

    setStrength(adjustedStrength);

    const currentFeedback: string[] = [];
    const currentSuggestions: string[] = [];

    if (!criteria.length) {
      currentFeedback.push("Password must be at least 10 characters long");
    }
    if (!criteria.uppercase) {
      currentFeedback.push("Missing uppercase letter");
    }
    if (!criteria.lowercase) {
      currentFeedback.push("Missing lowercase letter");
    }
    if (!criteria.number) {
      currentFeedback.push("Missing number");
    }
    if (!criteria.special) {
      currentFeedback.push("Missing special character");
    }

    if (criteriaCount >= 3 && analysis.feedback.suggestions.length > 0) {
      currentSuggestions.push(...analysis.feedback.suggestions);
    }

    if (pass.length > 0) {
      if (/(.)\1{2,}/.test(pass)) {
        currentSuggestions.push("Avoid repeating characters");
      }
      if (/^[A-Za-z]+\d+$/.test(pass)) {
        currentSuggestions.push("Mix up the order of letters and numbers");
      }
    }

    setFeedback(currentFeedback);
    setSuggestions(currentSuggestions);
    setRecommendations(generateRecommendations(pass));
  };

  const getStrengthColor = () => {
    if (strength < 30) return "bg-red-500";
    if (strength < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-zinc-800">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Password Strength Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pr-20 border rounded-md border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={generateStrongPassword}
              className="w-full p-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Generate Strong Password
            </button>

            <div>
              <div className="flex justify-between mb-2 text-sm text-zinc-600">
                <span>Strength</span>
                <span>{Math.round(strength)}%</span>
              </div>
              <Progress value={strength} className={`h-2 ${getStrengthColor()}`} />
            </div>

            {/* Requirements */}
            <div className="space-y-1">
              {feedback.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-zinc-600">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Password Recommendations */}
            {recommendations.length > 0 && password.length > 0 && (
              <div className="space-y-1 bg-green-50 p-3 rounded-md">
                <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Similar Strong Passwords:
                </h3>
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-green-600">
                    <button
                      onClick={() => setPassword(rec)}
                      className="hover:text-green-800 transition-colors"
                    >
                      {rec}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-1 bg-blue-50 p-3 rounded-md">
                <h3 className="text-sm font-semibold text-blue-700 mb-2">Suggestions:</h3>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-blue-600">
                    <CheckCircle className="w-4 h-4 mt-0.5" />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              className="w-full p-2 mt-3 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={strength < 60}
            >
              {strength < 60 ? "Password Not Strong Enough" : "Submit"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordAnalyzer;