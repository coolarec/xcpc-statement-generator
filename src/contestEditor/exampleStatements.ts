import type { Contest } from "@/types/contest";

export const exampleStatements: Record<string, Contest> = {
  SupportedGrammar: {
    meta: {
      title: "这是一场 XCPC 程序设计竞赛",
      subtitle: "试题册",
      author: "初梦",
      date: "2025 年 12 月 4 日",
      enable_titlepage: true,
    },
    problems: [
      {
        problem: {
          display_name: "A+B Problem",
          samples: [{ input: "1 2", output: "3" }],
        },
        statement: {
          description: "计算两个整数的和。",
          input: "一行包含两个整数 $a$ 和 $b$。",
          output: "输出 $a + b$ 的值。",
          notes: "$-10^9 \\leq a, b \\leq 10^9$",
        },
      },
      {
        problem: {
          display_name: "Hello World",
          samples: [{ input: "", output: "Hello, World!" }],
        },
        statement: {
          description: "输出固定的字符串。",
          input: "无输入。",
          output: '输出一行字符串 "Hello, World!"。',
          notes: "请确保输出完全匹配。",
        },
      },
    ],
  },

  ICPCRegionals: {
    meta: {
      title: "ICPC Asia Regional Contest",
      subtitle: "Beijing Site",
      author: "ICPC Beijing Committee",
      date: "2025年12月15日",
      enable_titlepage: true,
    },
    problems: [
      {
        problem: {
          display_name: "Array Sum",
          samples: [{ input: "5\n1 2 3 4 5", output: "15" }],
        },
        statement: {
          description: "给定一个数组，计算数组中所有元素的和。",
          input: "第一行包含一个整数 $n$，表示数组长度。\n第二行包含 $n$ 个整数。",
          output: "输出数组元素的和。",
          notes: "$1 \\leq n \\leq 10^5$，$-1000 \\leq a_i \\leq 1000$",
        },
      },
    ],
  },

  SimpleContest: {
    meta: {
      title: "简单算法练习赛",
      subtitle: "第1场",
      author: "算法学习小组",
      date: "2025年11月",
      enable_titlepage: false,
    },
    problems: [
      {
        problem: {
          display_name: "最大值",
          samples: [{ input: "3\n5 2 8", output: "8" }],
        },
        statement: {
          description: "找出一组数中的最大值。",
          input: "第一行一个整数 $n$，第二行 $n$ 个整数。",
          output: "输出这 $n$ 个整数中的最大值。",
          notes: "$1 \\leq n \\leq 1000$",
        },
      },
    ],
  },
};
