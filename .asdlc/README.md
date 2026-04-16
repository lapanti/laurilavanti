# ASDLC — Shareable Base Layer

This directory is the **shareable, project-agnostic scaffolding** for the [Agentic Software Development Life Cycle (ASDLC)](https://asdlc.io) framework.

It is designed to be dropped into any project as a stable base. Each project then adds its own `AGENTS.md` at the root and populates `.agents/` with project-specific specs, PBIs, and ADRs.

## Structure

```
.asdlc/
├── README.md            ← This file
├── templates/           ← Skeleton files with ASDLC anatomy
│   ├── AGENTS.md.template
│   ├── spec.md.template
│   ├── pbi.md.template
│   └── adr.md.template
├── personas/            ← Session-scoped agent role definitions
│   ├── builder.md
│   ├── critic.md
│   ├── architect.md
│   └── spec-writer.md
└── workflows/           ← Reusable ASDLC process workflows
    ├── adversarial-review.md
    ├── spec-authoring.md
    └── pbi-execution.md
```

## How to Adopt in a New Project

### 1. Copy the base layer

```bash
# As a subtree (recommended for staying up-to-date)
git subtree add --prefix .asdlc <asdlc-base-repo-url> main --squash

# Or simply copy the directory
cp -r .asdlc /path/to/your-project/
```

### 2. Create your project AGENTS.md

```bash
cp .asdlc/templates/AGENTS.md.template AGENTS.md
# Edit AGENTS.md — fill in Mission, Toolchain, Judgment Boundaries, Context Map
```

### 3. Symlink for Claude Code (Cline)

```bash
ln -s AGENTS.md CLAUDE.md
```

### 4. Create the runtime directories

```bash
mkdir -p .agents/{specs,pbis,adrs,state/{trajectories,logs}}
touch .agents/{specs,pbis,adrs}/.gitkeep
echo '.agents/state/' >> .gitignore
```

### 5. Add project-specific customizations

- Layer **project-specific personas** or workflows alongside the base ones in `.asdlc/`
- Override base templates by creating project versions in `.agents/`
- Add project constraints to `AGENTS.md` Judgment Boundaries

## The Two-Layer Model

| Layer | Location | Owned by | Changes |
|---|---|---|---|
| **Base (ASDLC)** | `.asdlc/` | Shared / team standard | Rarely — when ASDLC framework evolves |
| **Project** | `AGENTS.md`, `.agents/` | Individual project | As the project evolves |

## Key References

- [ASDLC Framework](https://asdlc.io)
- [AGENTS.md Spec](https://asdlc.io/practices/agents-md-spec)
- [The Spec Pattern](https://asdlc.io/patterns/the-spec)
- [The PBI Pattern](https://asdlc.io/patterns/the-pbi)
- [Agent Personas](https://asdlc.io/practices/agent-personas)
- [Adversarial Code Review](https://asdlc.io/patterns/adversarial-code-review)
