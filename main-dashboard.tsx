"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight, Send, User, Bot } from "lucide-react"

// Mock chat data
const mockChatMessages = [
  { id: 1, type: "user", message: "안녕하세요! 오늘 날씨는 어떤가요?", timestamp: "10:30" },
  {
    id: 2,
    type: "bot",
    message: "안녕하세요! 오늘은 맑고 화창한 날씨입니다. 기온은 22도 정도로 쾌적합니다.",
    timestamp: "10:31",
  },
  { id: 3, type: "user", message: "좋네요! 산책하기 좋은 날씨군요.", timestamp: "10:32" },
  {
    id: 4,
    type: "bot",
    message: "네, 맞습니다! 오늘 같은 날씨에는 야외 활동을 하시기에 정말 좋을 것 같아요.",
    timestamp: "10:33",
  },
]

interface SectionData {
  title: string
  content: string
  loading: boolean
}

export default function MainDashboard() {
  const [sections, setSections] = useState<Record<string, SectionData>>({
    section2: { title: "데이터 분석", content: "", loading: false },
    section3: { title: "시스템 상태", content: "", loading: false },
    section4: { title: "리포트", content: "", loading: false },
  })

  const handleApiCall = async (sectionKey: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], loading: true },
    }))

    // Simulate API call
    setTimeout(() => {
      const mockResponses = {
        section2: `📊 데이터 분석 결과

• 총 사용자 수: 15,847명
• 일일 활성 사용자: 3,245명
• 전환율: 12.3%
• 평균 세션 시간: 4분 32초

📈 주요 지표:
- 신규 가입자: +23% (지난주 대비)
- 매출: +15.7% (전월 대비)
- 고객 만족도: 4.8/5.0`,

        section3: `🔧 시스템 상태 모니터링

✅ 웹 서버: 정상 (99.9% 가동률)
✅ 데이터베이스: 정상 (응답시간: 45ms)
✅ API 서버: 정상 (처리량: 1,250 req/min)
⚠️ CDN: 경고 (일부 지역 지연)

🔄 최근 업데이트:
- 보안 패치 적용 완료
- 성능 최적화 배포
- 백업 시스템 점검 완료`,

        section4: `📋 월간 리포트 요약

📅 2024년 1월 리포트

💰 매출 현황:
- 총 매출: ₩125,000,000
- 목표 달성률: 108%
- 주요 수익원: 프리미엄 구독 (67%)

👥 사용자 현황:
- 신규 사용자: 2,847명
- 이탈률: 8.2%
- 평균 이용 시간: 증가 (+12%)

🎯 다음 달 목표:
- 신규 기능 3개 출시
- 사용자 만족도 개선
- 마케팅 캠페인 확대`,
      }

      setSections((prev) => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          content: mockResponses[sectionKey as keyof typeof mockResponses],
          loading: false,
        },
      }))
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">대시보드</h1>
          <p className="text-slate-600">실시간 데이터와 시스템 현황을 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Section - Top Left */}
          <Card className="flex flex-col shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-lg font-semibold text-slate-900">실시간 채팅</h2>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100"
                onClick={() => console.log("Chat API call")}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 pb-4">
                  {mockChatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === "user" ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {msg.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`max-w-[80%] ${msg.type === "user" ? "text-right" : ""}`}>
                        <div
                          className={`inline-block p-3 rounded-2xl ${
                            msg.type === "user"
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-slate-100 text-slate-900 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 px-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-slate-50/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button size="sm" className="px-3">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Section - Top Right */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{sections.section2.title}</h2>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100"
                onClick={() => handleApiCall("section2")}
                disabled={sections.section2.loading}
              >
                {sections.section2.loading ? (
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {sections.section2.content ? (
                  <div className="whitespace-pre-line text-sm text-slate-700 leading-relaxed">
                    {sections.section2.content}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="h-8 w-8" />
                      </div>
                      <p>버튼을 클릭하여 데이터를 불러오세요</p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* System Status Section - Bottom Left */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{sections.section3.title}</h2>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100"
                onClick={() => handleApiCall("section3")}
                disabled={sections.section3.loading}
              >
                {sections.section3.loading ? (
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {sections.section3.content ? (
                  <div className="whitespace-pre-line text-sm text-slate-700 leading-relaxed">
                    {sections.section3.content}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="h-8 w-8" />
                      </div>
                      <p>버튼을 클릭하여 데이터를 불러오세요</p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Report Section - Bottom Right */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{sections.section4.title}</h2>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100"
                onClick={() => handleApiCall("section4")}
                disabled={sections.section4.loading}
              >
                {sections.section4.loading ? (
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {sections.section4.content ? (
                  <div className="whitespace-pre-line text-sm text-slate-700 leading-relaxed">
                    {sections.section4.content}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="h-8 w-8" />
                      </div>
                      <p>버튼을 클릭하여 데이터를 불러오세요</p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
